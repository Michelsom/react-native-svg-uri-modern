import { ScrollView, View, Text, StyleSheet } from "react-native"
import SvgUriModern from "react-native-svg-uri-modern"

const App = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>React Native SVG URI Modern Examples</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Usage</Text>
        <SvgUriModern source="https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/410.svg" width={100} height={100} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>With Custom Colors</Text>
        <SvgUriModern
          source="https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/410.svg"
          width={100}
          height={100}
          fill="#FF6B6B"
          stroke="#4ECDC4"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Direct SVG Content</Text>
        <SvgUriModern
          source={`<svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="#FFE66D" stroke="#FF6B6B" strokeWidth="3"/>
          </svg>`}
          width={100}
          height={100}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>With Loading and Error Handling</Text>
        <SvgUriModern
          source="https://example.com/nonexistent.svg"
          width={100}
          height={100}
          showLoading={true}
          onLoad={() => console.log("SVG loaded successfully")}
          onError={(error) => console.log("SVG failed to load:", error.message)}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F9FA",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#2C3E50",
  },
  section: {
    marginBottom: 30,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: "#34495E",
  },
})

export default App
