import Document, {Html, Head, Main, NextScript, DocumentContext} from 'next/document';
import {Container, CssBaseline, Link, Row, Spacer} from '@nextui-org/react';
import React from "react";

class MyDocument extends Document {

    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return {
            ...initialProps,
            styles: <>{initialProps.styles}</>
        };
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta
                        name="description"
                        content="Olaf movie browser"
                    />
                    <link rel="icon" href="/favicon.ico"/>
                    {CssBaseline.flush()}
                </Head>
                <body>
                <Main />
                <NextScript />
                <Container>
                    <Spacer y={0.3}/>
                    <Row align="center" justify="center">
                        <p>This product uses the <Link><a href={'https://www.themoviedb.org/'} target={'_blank'} rel={'noreferrer'}>TMDB API</a></Link> &nbsp;but is not endorsed or certified by TMDB.</p>
                    </Row>
                    <Spacer y={0.1}/>
                </Container>
                </body>
            </Html>
        );
    }
}

export default MyDocument
