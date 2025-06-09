import { View, Text, StyleSheet } from "react-native"
import SvgUriModern from "../src/index"

const Page = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native SVG URI Modern</Text>
      <SvgUriModern source="https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/410.svg" width={200} height={200} />
      <Text style={styles.subtitle}>Example SVG</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 10,
  },
})

export default Page
