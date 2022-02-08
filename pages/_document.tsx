import Document, {Html, Head, Main, NextScript, DocumentContext} from 'next/document';
import {Container, CssBaseline, Link, Row, Spacer} from '@nextui-org/react';

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
                    {CssBaseline.flush()}
                </Head>
                <body>
                <Main />
                <NextScript />
                <Container>
                    <Spacer y={1}/>
                    <Row align="center">
                        This product uses the <Link><a href={'https://www.themoviedb.org/'} target={'_blank'} rel={'noreferrer'}>TMDB API</a></Link> &nbsp;but is not endorsed or certified by TMDB.
                    </Row>
                    <Spacer y={2}/>
                </Container>
                </body>
            </Html>
        );
    }
}

export default MyDocument
