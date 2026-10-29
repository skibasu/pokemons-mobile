import { useReactQueryDevTools } from "@dev-plugins/react-query"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Stack } from "expo-router"

const queryClient = new QueryClient()

function QueryProvider({ children }: { children: React.ReactNode }) {
    useReactQueryDevTools(queryClient)

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default function RootLayout() {
    return (
        <QueryProvider>
            <Stack>
                <Stack.Screen
                    name="index"
                    options={{
                        title: "Pokémony",
                    }}
                />

                <Stack.Screen
                    name="details/[name]"
                    options={{
                        title: "Pokemon Details",
                        headerBackButtonDisplayMode: "minimal",
                    }}
                />
            </Stack>
        </QueryProvider>
    )
}
