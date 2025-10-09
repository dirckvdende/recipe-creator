
import CenterContent from "./components/center-content";
import styles from "./page.module.scss";
import Section from "./components/section";
import Editable from "./components/editable";

export default function Home() {
    return <CenterContent>
        <Editable><h1 className={styles.title}>Recipe</h1></Editable>
        <Section>
            <Editable>
                <h2 className="title">Ingredients</h2>
            </Editable>
            <ul>
                <li>Egg</li>
                <li>Bacon</li>
                <li>Bread</li>
                <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem minus, dolore consequuntur praesentium deserunt culpa iusto facere molestias deleniti saepe voluptate placeat non facilis sed neque molestiae beatae, ducimus quam?</li>
            </ul>
        </Section>
    </CenterContent>
}
