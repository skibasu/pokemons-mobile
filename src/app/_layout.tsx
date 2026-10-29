import { useReactQueryDevTools } from "@dev-plugins/react-query"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Stack, useLocalSearchParams } from "expo-router"

const queryClient = new QueryClient()

function QueryProvider({ children }: { children: React.ReactNode }) {
    useReactQueryDevTools(queryClient)

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default function RootLayout() {
    const { name: title } = useLocalSearchParams<{ name: string }>()
    return (
        <QueryProvider>
            <Stack>
                <Stack.Screen name="index" options={{ title: "Pokemons", headerTransparent: false, headerShown: true }} />
                <Stack.Screen name="details/[name]" options={{ title: title ?? "Pokemon Details", headerTransparent: false, headerBackButtonDisplayMode: "minimal" }} />
            </Stack>
        </QueryProvider>
    )
}
