
/**
 * Object that can be used to encode data into a Uint8array. Data can be written
 * by using methods like writeString, writeInt, etc.
 */
export class Uint8Encoder {

    // List of output arrays. When concatenated these form the encoded data
    private output: Uint8Array<ArrayBuffer>[];

    /**
     * Constructor
     */
    constructor() {
        this.output = [];
    }

    /**
     * Encode a string and add it to the output data of this object
     * @param value The string to encode, which may not contain any null
     * characters
     */
    writeString(value: string) {
        this.output.push(new TextEncoder().encode(value), new Uint8Array([0]));
    }

    /**
     * Encode an integer and add it to the output data of this object
     * @param value The integer to encode, as a javascript number
     * @param size The size in bytes of the integer to encode, default is 4 (32
     * bits)
     * @param signed Whether the integer is signed or not, default is true
     */
    writeInt(value: number | bigint, size: number = 4, signed: boolean = true) {
        let intValue = BigInt(value);
        let minValue: bigint, maxValue: bigint;
        if (signed) {
            minValue = -(BigInt(1) << BigInt(size * 8 - 1));
            maxValue = (BigInt(1) << BigInt(size * 8 - 1)) - BigInt(1);
        } else {
            minValue = BigInt(0);
            maxValue = (BigInt(1) << BigInt(size * 8)) - BigInt(1);
        }
        if (intValue < minValue || intValue > maxValue)
            throw new Error(`Value ${intValue} cannot be encoded because it ` +
            `is not in the range [${minValue}, ${maxValue}]`);
        if (intValue < 0)
            intValue += maxValue - minValue + BigInt(1);
        let split: number[] = [];
        for (let i = 0; i < size; i++) {
            split.push(Number(intValue % BigInt(256)))
            intValue /= BigInt(256);
        }
        this.output.push(new Uint8Array(split));
    }

    /**
     * Encode a date (without time) and add it to the output data of this object
     * @param date The date to encode
     */
    writeDate(date: Date) {
        this.writeInt(BigInt(date.getTime()) / BigInt(86400000), 4, true);
    }

    /**
     * Encode a date and time and add it to the output data of this object
     * @param date The date and time to encode
     */
    writeDateTime(date: Date) {
        this.writeInt(date.getTime(), 8, true);
    }

    /**
     * Encode a date (without time) or null/undefined (these two are not
     * distinguishable) and add it to the output data of this object
     * @param date The date (or null/undefined) to encode
     */
    writeDateOptional(date: Date | undefined | null) {
        if (!date)
            this.writeInt(-(BigInt(1) << BigInt(31)), 4, true);
        else
            this.writeDate(date);
    }

    /**
     * Write raw bytes to the output
     * @param bytes The bytes to write
     */
    writeBytes(bytes: Uint8Array) {
        this.output.push(bytes.slice());
    }

    /**
     * Get the data in the Uint8Encoder and convert it to a blob
     */
    toURL(): string {
        let blob = new Blob([this.data.slice()], {
            type: "application/octet-stream"
        });
        return URL.createObjectURL(blob);
    }

    /**
     * The Uint8Array that represents the data sent to this object
     */
    get data(): Uint8Array<ArrayBuffer> {
        let length = 0;
        for (let out of this.output)
            length += out.length;
        let data = new Uint8Array(length);
        let offset = 0;
        for (let out of this.output) {
            data.set(out, offset);
            offset += out.length;
        }
        return data;
    }

}

/**
 * Decoder object of Uint8Arrays. Can decode the output of the Uint8Encoder.
 * Methods like readString() and readInt() can be used to read data from a
 * Uint8Array object
 */
export class Uint8Decoder {

    // Data to be decoded
    data: Uint8Array;
    // Current index in the data array being read
    index: number;

    /**
     * Constructor
     * @param data The data to be decoded. This object is not copied, so data
     * should not be modified while decoding
     */
    constructor(data: Uint8Array) {
        this.data = data;
        this.index = 0;
    }

    /**
     * Check if the decoder is readinf past the end of the input data
     * @returns If the decoder is reading past the end of the input data, as a
     * boolean
     */
    end(): boolean {
        return this.index >= this.data.length;
    }

    /**
     * Read a string from the input data
     * @returns The string that was read
     */
    readString(): string {
        let data: number[] = [];
        while (this.index < this.data.length && this.data[this.index] != 0) {
            data.push(this.data[this.index]!);
            this.index++;
        }
        if (this.index >= this.data.length)
            throw new Error("Reached end of input data before end of string");
        this.index++;
        return new TextDecoder().decode(new Uint8Array(data));
    }

    /**
     * Read an integer from the input data
     * @param size The size in bytes of the integer, defaults to 4
     * @param signed Whether the integer being read is signed, default to true
     * @returns The integer that was read
     */
    readInt(size: number = 4, signed: boolean = true): bigint {
        if (this.index + size > this.data.length)
            throw new Error("Reached end of input while reading int");
        let value = BigInt(0), mult = BigInt(1);
        for (let i = 0; i < size; i++) {
            value += BigInt(this.data[this.index]!) * mult;
            this.index++;
            mult *= BigInt(256);
        }
        if (signed && value >= BigInt(1) << BigInt(size * 8 - 1))
            value -= BigInt(1) << BigInt(size * 8);
        return value;
    }

    /**
     * Read a date from the input data (without time)
     * @returns The date that was read, with hours, minutes, seconds, and
     * milliseconds set to 0
     */
    readDate(): Date {
        let date = new Date();
        date.setTime(Number(this.readInt(4, true) * BigInt(86400000)));
        date.setUTCHours(0, 0, 0, 0);
        return date;
    }

    /**
     * Read a date and time from the input data
     * @returns The data and time that were read
     */
    readDateTime(): Date {
        let date = new Date();
        date.setTime(Number(this.readInt(8, true)));
        return date;
    }

    /**
     * Optional version of readDate, where a specific value is reserved for
     * undefined. Works with Uint8Encoder.writeDateOptional
     * @returns Either the date that was read, or undefined if no date was
     * stored
     */
    readDateOptional(): Date | undefined {
        let num = this.readInt(4, true);
        if (num == -(BigInt(1) << BigInt(31)))
            return undefined;
        let date = new Date();
        date.setTime(Number(num * BigInt(86400000)));
        date.setUTCHours(0, 0, 0, 0);
        return date;
    }
    
    /**
     * Read raw bytes from the input data
     * @returns The raw bytes that were read
     */
    readBytes(length: number | bigint): Uint8Array<ArrayBuffer> {
        if (this.index + Number(length) > this.data.length)
            throw new Error(`Input not long enough to read ${length} bytes`);
        let bytes = this.data.slice(this.index, this.index + Number(length));
        this.index += Number(length);
        return bytes;
    }

    /**
     * Read bytes and compare them to the given expected bytes
     * @param expected The bytes that are expected
     * @returns A boolean indicating if the two were equal
     * @note If the remaining input is not long enough, sets the reading index
     * to the end of the input and returns false
     */
    checkBytes(expected: Uint8Array): boolean {
        if (this.index + Number(length) > this.data.length) {
            this.index = this.data.length;
            return false;
        }
        let bytes = this.readBytes(expected.length);
        for (let i = 0; i < expected.length; i++)
            if (expected[i] != bytes[i])
                return false;
        return true;
    }

}

/**
 * Get the number of bytes needed to store the given amount of different values,
 * i.e. ceil(log2(amount) / 8)
 * @param amount The amount of different values that should be able to be
 * encoded, i.e. the range [0, amount - 1]
 * @returns The number of bytes needed
 */
export function bytesNeededForRange(amount: number): number {
    return Math.ceil(Math.log2(amount) / 8)
}