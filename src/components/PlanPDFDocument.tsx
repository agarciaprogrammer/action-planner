"use client";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { Plan } from "../../src/types/plan";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  step: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderBottomStyle: "solid",
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  stepDescription: {
    marginBottom: 4,
  },
  stepMeta: {
    fontSize: 10,
    color: "#555",
  },
  resource: {
    fontSize: 10,
    color: "blue",
    textDecoration: "underline",
  },
});

export default function PlanPDFDocument({ plan }: { plan: Plan }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{plan.title}</Text>
        {plan.steps.map((step, i) => (
          <View key={i} style={styles.step}>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepDescription}>{step.description}</Text>
            <Text style={styles.stepMeta}>
              ⏱️ {step.estimatedHours} horas | 📅 {step.deadline}
            </Text>
            {step.resources.map((r, j) => (
              <Text key={j} style={styles.resource}>
                {r.title}: {r.url}
              </Text>
            ))}
          </View>
        ))}
      </Page>
    </Document>
  );
}