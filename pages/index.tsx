import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {
    Container,
    Button,
    Input,
    Spacer,
    Text,
    Link, Row
} from '@nextui-org/react';
import {Search} from "react-iconly";

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Movies browser</title>
                <meta
                    name="description"
                    content="Browse movies"
                />
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Container
                xl
                as="main"
                display="flex"
                direction="column"
                justify="center"
                alignItems="center"
                style={{height: '100vh'}}
            >
                <Link href="https://nextjs.org">
                    <Text
                        h1
                        className={styles.title}
                        size={60}
                        css={{
                            textGradient: '45deg, $purple500 -20%, $pink500 100%'
                        }}
                        weight="bold"
                    >
                        Movie browser
                    </Text>
                </Link>
                <Spacer/>
                <Row justify="center" align="center">
                    <Input
                        width="40vw"
                        clearable
                        contentRightStyling={false}
                        placeholder="Search for movie title..."
                        contentRight={<Button
                            auto
                            color="gradient"
                            icon={<Search set="curved" primaryColor="currentColor" />}
                        />}
                    />
                </Row>
            </Container>
        </div>
    )
}

export default Home
