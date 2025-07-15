import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
    lineHeight: 1.4,
  },

  // Header Section
  header: {
    marginBottom: 30,
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 11,
    color: "#666666",
    textAlign: "center",
    marginTop: 5,
  },

  // Results Info
  resultsInfo: {
    marginBottom: 25,
    textAlign: "center",
  },

  resultsText: {
    fontSize: 12,
    color: "#333333",
    fontWeight: "medium",
  },

  // Table Styles
  table: {
    width: "100%",
    marginBottom: 30,
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    borderBottomStyle: "solid",
  },

  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#f1f3f4",
    borderBottomStyle: "solid",
    minHeight: 35,
    alignItems: "center",
  },

  tableRowLast: {
    borderBottomWidth: 0,
  },

  // Cell Styles
  cellIndex: {
    width: "6%",
    paddingHorizontal: 8,
    textAlign: "center",
    color: "#666666",
    fontSize: 9,
  },

  cellName: {
    width: "22%",
    paddingHorizontal: 12,
    color: "#1a1a1a",
    fontWeight: "medium",
    fontSize: 10,
  },

  cellEmail: {
    width: "30%",
    paddingHorizontal: 12,
    fontSize: 9,
    color: "#2563eb",
    textDecoration: "underline",
  },

  cellBloodGroup: {
    width: "12%",
    paddingHorizontal: 12,
    alignItems: "center",
  },

  bloodGroupBadge: {
    backgroundColor: "#fff5f5",
    borderWidth: 1,
    borderColor: "#fed7d7",
    borderStyle: "solid",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    minWidth: 35,
    alignItems: "center",
  },

  bloodGroupText: {
    color: "#c53030",
    fontSize: 9,
    fontWeight: "bold",
  },

  cellDistrict: {
    width: "15%",
    paddingHorizontal: 12,
    color: "#4a5568",
    fontSize: 9,
  },

  cellUpazila: {
    width: "15%",
    paddingHorizontal: 12,
    color: "#4a5568",
    fontSize: 9,
  },

  // Header Cell Styles
  headerCell: {
    color: "#2d3748",
    fontSize: 9,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 40,
    left: 50,
    right: 50,
    textAlign: "center",
    fontSize: 8,
    color: "#a0aec0",
    paddingTop: 15,
    borderTopWidth: 0.5,
    borderTopColor: "#e2e8f0",
    borderTopStyle: "solid",
  },
});

const DonorPDFDocument = ({ donors }) => {
  const totalDonors = donors.length;
  const donorText = totalDonors === 1 ? "donor" : "donors";
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Blood Donor Search Result</Text>
          <Text style={styles.subtitle}> Prepared by BloodGrid System</Text>
        </View>

        {/* Results Info */}
        <View style={styles.resultsInfo}>
          <Text style={styles.resultsText}>
            {totalDonors} {donorText} found
          </Text>
        </View>

        {/* Table */}
        <View style={styles.table}>
          {/* Header Row */}
          <View style={styles.tableHeader}>
            <Text style={[styles.cellIndex, styles.headerCell]}>#</Text>
            <Text style={[styles.cellName, styles.headerCell]}>Name</Text>
            <Text style={[styles.cellEmail, styles.headerCell]}>Email</Text>
            <Text style={[styles.cellBloodGroup, styles.headerCell]}>
              Blood
            </Text>
            <Text style={[styles.cellDistrict, styles.headerCell]}>
              District
            </Text>
            <Text style={[styles.cellUpazila, styles.headerCell]}>Upazila</Text>
          </View>

          {/* Data Rows */}
          {donors.map((donor, index) => (
            <View
              style={[
                styles.tableRow,
                index === donors.length - 1 ? styles.tableRowLast : null,
              ]}
              key={donor._id}
            >
              <Text style={styles.cellIndex}>{index + 1}</Text>
              <Text style={styles.cellName}>{donor.name}</Text>
              <Text style={styles.cellEmail} link={`mailto:${donor.email}`}>
                {donor.email}
              </Text>
              <View style={styles.cellBloodGroup}>
                <View style={styles.bloodGroupBadge}>
                  <Text style={styles.bloodGroupText}>{donor.bloodGroup}</Text>
                </View>
              </View>
              <Text style={styles.cellDistrict}>{donor.district}</Text>
              <Text style={styles.cellUpazila}>{donor.upazila}</Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Generated on {currentDate} • BloodGrid
        </Text>
      </Page>
    </Document>
  );
};

export default DonorPDFDocument;
