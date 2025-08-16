import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import logo from "/logo.png";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
    lineHeight: 1.5,
  },

  // Header Section
  header: {
    marginBottom: 30,
    alignItems: "center",
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#dc2626",
    borderBottomStyle: "solid",
  },

  brandSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  brandLogo: {
    width: 28,
    height: 28,
    marginRight: 4,
    marginBottom: -8,
  },

  brandName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#dc2626",
    textAlign: "center",
  },

  brandTagline: {
    fontSize: 10,
    color: "#6b7280",
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    textAlign: "center",
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 11,
    color: "#6b7280",
    textAlign: "center",
  },

  // Search Info - Minimal
  searchInfo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    gap: 15,
  },

  searchItem: {
    alignItems: "center",
  },

  searchLabel: {
    fontSize: 8,
    color: "#9ca3af",
    marginBottom: 2,
  },

  searchValue: {
    fontSize: 11,
    color: "#dc2626",
    fontWeight: "bold",
  },

  // Results Info - Minimal
  resultsInfo: {
    marginBottom: 25,
    alignItems: "center",
  },

  resultsText: {
    fontSize: 16,
    color: "#1f2937",
    fontWeight: "bold",
    textAlign: "center",
  },

  resultsCount: {
    color: "#dc2626",
  },

  // Table Styles - Minimal
  table: {
    width: "100%",
    marginBottom: 25,
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f8fafc",
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#dc2626",
    borderBottomStyle: "solid",
    alignItems: "center",
  },

  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#f1f5f9",
    borderBottomStyle: "solid",
    minHeight: 36,
    alignItems: "center",
  },

  tableRowEven: {
    backgroundColor: "#fafbfc",
  },

  tableRowLast: {
    borderBottomWidth: 0,
  },

  // Cell Styles
  cellIndex: {
    width: "8%",
    paddingHorizontal: 8,
    textAlign: "center",
    fontSize: 9,
  },

  cellName: {
    width: "25%",
    paddingHorizontal: 12,
    fontSize: 10,
    fontWeight: "medium",
  },

  cellEmail: {
    width: "30%",
    paddingHorizontal: 12,
    fontSize: 9,
    color: "#dc2626",
  },

  cellBloodGroup: {
    width: "12%",
    paddingHorizontal: 8,
    alignItems: "center",
  },

  bloodGroupBadge: {
    backgroundColor: "#ffffff",
    borderWidth: 1.5,
    borderColor: "#dc2626",
    borderStyle: "solid",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    minWidth: 32,
    alignItems: "center",
  },

  bloodGroupText: {
    color: "#dc2626",
    fontSize: 9,
    fontWeight: "bold",
  },

  cellLocation: {
    width: "12.5%",
    paddingHorizontal: 8,
    fontSize: 9,
  },

  headerCell: {
    color: "#374151",
    fontSize: 9,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },

  dataCell: {
    color: "#374151",
  },

  dataCellSecondary: {
    color: "#6b7280",
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    borderTopStyle: "solid",
  },
  footerBrandLogo: {
    width: 10,
    height: 10,
    marginRight: 4,
    marginTop:-3
    
  },

  footerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  footerLeft: {
    flex: 1,
  },
  footerlogo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  footerRight: {
    flex: 1,
    alignItems: "flex-end",
  },

  footerText: {
    fontSize: 8,
    color: "#9ca3af",
  },

  footerBrand: {
    fontSize: 10,
    color: "#dc2626",
    fontWeight: "bold",
  },

  // Warning/Info Box
  infoBox: {
    backgroundColor: "#fef3c7",
    borderWidth: 1,
    borderColor: "#fde68a",
    borderStyle: "solid",
    borderRadius: 6,
    padding: 12,
    marginTop: 20,
  },

  infoText: {
    fontSize: 9,
    color: "#92400e",
    textAlign: "center",
    lineHeight: 1.4,
  },
});

const DonorPDFDocument = ({ donors, searchCriteria = {} }) => {
  const totalDonors = donors.length;
  const donorText = totalDonors === 1 ? "donor" : "donors";
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.brandSection}>
            <Image src={logo} style={styles.brandLogo} />
            <Text style={styles.brandName}>BloodGrid</Text>
          </View>
          <Text style={styles.title}>Blood Donor Search Results</Text>
          <Text style={styles.subtitle}>
            Generated on {currentDate} at {currentTime}
          </Text>
        </View>

        {/* Search Criteria */}
        {(searchCriteria.bloodGroup ||
          searchCriteria.district ||
          searchCriteria.upazila) && (
          <View style={styles.searchInfo}>
            {searchCriteria.bloodGroup && (
              <View style={styles.searchItem}>
                <Text style={styles.searchLabel}>Blood Group</Text>
                <Text style={styles.searchValue}>
                  {searchCriteria.bloodGroup}
                </Text>
              </View>
            )}
            {searchCriteria.district && (
              <View style={styles.searchItem}>
                <Text style={styles.searchLabel}>District</Text>
                <Text style={styles.searchValue}>
                  {searchCriteria.district}
                </Text>
              </View>
            )}
            {searchCriteria.upazila && (
              <View style={styles.searchItem}>
                <Text style={styles.searchLabel}>Upazila</Text>
                <Text style={styles.searchValue}>{searchCriteria.upazila}</Text>
              </View>
            )}
          </View>
        )}

        {/* Results Summary */}
        <View style={styles.resultsInfo}>
          <Text style={styles.resultsText}>
            <Text style={styles.resultsCount}>{totalDonors}</Text> {donorText}{" "}
            found
          </Text>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.cellIndex, styles.headerCell]}>#</Text>
            <Text style={[styles.cellName, styles.headerCell]}>Name</Text>
            <Text style={[styles.cellEmail, styles.headerCell]}>Email</Text>
            <Text style={[styles.cellBloodGroup, styles.headerCell]}>
              Blood
            </Text>
            <Text style={[styles.cellLocation, styles.headerCell]}>
              District
            </Text>
            <Text style={[styles.cellLocation, styles.headerCell]}>
              Upazila
            </Text>
          </View>

          {donors.map((donor, index) => (
            <View
              style={[
                styles.tableRow,
                index % 2 === 1 ? styles.tableRowEven : null,
                index === donors.length - 1 ? styles.tableRowLast : null,
              ]}
              key={donor._id}
            >
              <Text style={[styles.cellIndex, styles.dataCellSecondary]}>
                {index + 1}
              </Text>
              <Text style={[styles.cellName, styles.dataCell]}>
                {donor.name}
              </Text>
              <Text style={[styles.cellEmail]}>{donor.email}</Text>
              <View style={styles.cellBloodGroup}>
                <View style={styles.bloodGroupBadge}>
                  <Text style={styles.bloodGroupText}>{donor.bloodGroup}</Text>
                </View>
              </View>
              <Text style={[styles.cellLocation, styles.dataCell]}>
                {donor.district}
              </Text>
              <Text style={[styles.cellLocation, styles.dataCellSecondary]}>
                {donor.upazila}
              </Text>
            </View>
          ))}
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Contact donors directly via email for blood donation requests.
            BloodGrid connects verified donors across Bangladesh.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <View style={styles.footerLeft}>
              <Text style={styles.footerText}>
                Report ID: BG-{Date.now().toString().slice(-6)}
              </Text>
              <Text style={styles.footerText}>Generated: {currentDate}</Text>
            </View>
            <View style={styles.footerRight}>
              <View style={styles.footerlogo}>
                <Image src={logo} style={styles.footerBrandLogo} />
                <Text style={styles.footerBrand}>BloodGrid</Text>
              </View>
              <Text style={styles.footerText}>
                https://bloodgrid-bd.web.app/
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default DonorPDFDocument;
