import type {NextPage} from 'next'
import Link from 'next/link'

import PageLayout from "../components/PageLayout";

const Home: NextPage = () => {
    return (
        <PageLayout pageTitle="Shopping Manager" isHomePage>
            <ul>
                <li>
                    <Link href="recipes">
                        <a>Recipes</a>
                    </Link>
                </li>
            </ul>

        </PageLayout>
    )
}

export default Home
