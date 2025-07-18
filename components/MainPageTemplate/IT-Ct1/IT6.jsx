import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { useSelector } from "react-redux";

// Create styles for the PDF document
const styles = StyleSheet.create({
  resume: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    border: "1px solid #ddd",
    // overflow: 'hidden',
    padding: 10,
  },
  resumeLeft: {
    width: "30%",
    backgroundColor: "#333", // Dark Gray
    color: "#fff",
    padding: 10,
  },
  resumeRight: {
    width: "70%",
    backgroundColor: "#fff",
    padding: 10,
  },
  title: {
    marginBottom: 10,
  },
  bold: {
    fontWeight: "bold",
    fontSize: 12,
    textTransform: "uppercase",
  },
  semiBold: {
    fontWeight: "500",
    fontSize: 10,
  },
  regular: {
    color: "#ccc", // Light Gray
  },
  resumeItem: {
    marginBottom: 20,
    borderBottom: "2px solid #ccc", // Light Gray
    paddingBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
    backgroundColor: "#fff",
    color: "#333", // Dark Gray
    borderRadius: "50%",
    marginRight: 10,
    fontSize: 12,
    textAlign: "center",
    lineHeight: "20px",
  },
  data: {
    color: "#ccc",
  },
  date: {
    fontSize: 10,
    fontWeight: "500",
    marginBottom: 10,
  },
  info: {
    marginBottom: 15,
  },
  skillName: {
    width: "70%",
  },
  skillProgress: {
    width: "100%",
    height: 5,
    backgroundColor: "#666", // Medium Gray
    position: "relative",
    marginBottom: 5,
  },
  skillPer: {
    width: "15%",
  },
  skillProgressSpan: {
    height: "100%",
    backgroundColor: "#fff",
  },
});

// Define the PDF document component
const ResumeDocument = () => {
  const resumeData = useSelector((state) => state.resumeDataIT3);

  const {
    name,
    contactInfo,
    linkedinUrl,
    workExperience,
    skills,
    education,
    certification,
    awards,
  } = resumeData;

  return (
    <Document
      onClick={() => {
        alert("saloni");
      }}
    >
      <Page style={styles.resume}>
        <View style={styles.resumeLeft}>
          {name && (
            <View style={styles.resumeItem}>
              <Text style={styles.bold}>{name}</Text>
              <Text style={styles.regular}>{contactInfo.address}</Text>
              <Text style={styles.data}>{contactInfo.phone}</Text>
              <Text style={styles.data}>{contactInfo.email}</Text>
              {linkedinUrl && <Text style={styles.data}>{linkedinUrl}</Text>}
            </View>
          )}
          {skills && skills.length > 0 && (
            <View style={styles.resumeItem}>
              <Text style={styles.bold}>Skills</Text>
              {skills.map((skill, index) => (
                <View key={index} style={styles.skillName}>
                  <Text>{skill}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
        <View style={styles.resumeRight}>
          {workExperience && workExperience.length > 0 && (
            <View style={styles.resumeItem}>
              <Text style={styles.bold}>Work Experience</Text>
              {workExperience.map((work, index) => (
                <View key={index}>
                  <Text style={styles.date}>
                    {work.startDate} - {work.endDate}
                  </Text>
                  <Text style={styles.semiBold}>{work.title}</Text>
                  <Text>{work.company}</Text>
                  {work.details.map((detail, i) => (
                    <Text key={i}>{detail}</Text>
                  ))}
                </View>
              ))}
            </View>
          )}
          {education && education.length > 0 && (
            <View style={styles.resumeItem}>
              <Text style={styles.bold}>Education</Text>
              {education.map((edu, index) => (
                <View key={index}>
                  <Text style={styles.date}>
                    {edu.startYear} - {edu.endYear}
                  </Text>
                  <Text style={styles.semiBold}>{edu.degree}</Text>
                  <Text>{edu.institution}</Text>
                </View>
              ))}
            </View>
          )}
          {certification && certification.length > 0 && (
            <View style={styles.resumeItem}>
              <Text style={styles.bold}>Certifications</Text>
              {certification.map((cert, index) => (
                <View key={index}>
                  <Text style={styles.semiBold}>{cert.title}</Text>
                  <Text>
                    {cert.authority}, {cert.year}
                  </Text>
                </View>
              ))}
            </View>
          )}
          {awards && awards.length > 0 && (
            <View style={styles.resumeItem}>
              <Text style={styles.bold}>Awards</Text>
              {awards.map((award, index) => (
                <View key={index}>
                  <Text>
                    <Text style={styles.semiBold}>{award.title}</Text>
                    <Text>
                      {award.year} - {award.awarder}
                    </Text>
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default ResumeDocument;
