import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core'

import theme from '../theme'
import { createClient, Provider } from "urql";

const client = createClient({
    url: 'http://localhost:4000/graphql',
    fetchOptions: {
        credentials: "include"
    }
});

function MyApp({ Component, pageProps }: any) {
    return (
        <Provider value={ client }>
            <ThemeProvider theme={ theme }>
                <CSSReset/>
                <Component { ...pageProps } />
            </ThemeProvider>
        </Provider>
    )
}

export default MyApp
