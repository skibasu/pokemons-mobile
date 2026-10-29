import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    elem: {
        borderRadius: 8,
        padding: 16,
        justifyContent: "center",
        flexBasis: "40%",
        flexGrow: 0,
        flexShrink: 0,
        backgroundColor: "rgba(255, 192, 203, 0.6)",
    },
    image: { width: "100%", aspectRatio: 1 },
    title: { textAlign: "center", textTransform: "capitalize", fontWeight: "bold", fontSize: 18 },
})
