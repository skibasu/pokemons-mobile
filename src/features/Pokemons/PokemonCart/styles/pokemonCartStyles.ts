import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
    },
    elem: {
        borderWidth: 1,
        borderColor: "black",
        padding: 16,
        justifyContent: "center",
        flexBasis: "50%",
        flexGrow: 0,
        flexShrink: 0,
    },
    image: { width: "100%", aspectRatio: 1 },
    title: { textAlign: "center", textTransform: "capitalize", fontWeight: "bold", fontSize: 18 },
})
