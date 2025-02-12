import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "chart.js/auto";

const TeacherReport = ({ userId }) => {
    const [report, setReport] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const chartRef = useRef(null); // Reference for chart image

    useEffect(() => {
        // Fetch the report data for the specific userId
        axios.get(`/api/report/${userId}`)
            .then(response => {
                console.log('API Response:', userId);

                if (Array.isArray(response.data)) {
                    setReport(response.data);
                } else {
                    setReport([]); // In case the response is not an array
                    setError("Invalid data format received.");
                }
                setLoading(false);
            })
            .catch(error => {
                setError("Failed to fetch report data.");
                setLoading(false);
            });
    }, [userId]);

    if (loading) return <p>Loading report...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    // Chart Data
    const chartData = {
        labels: report.map(finalbmi => finalbmi.name),
        datasets: [
            {
                label: "Initial BMI",
                data: report.map(finalbmi => finalbmi.bmi),
                borderColor: "blue",
                backgroundColor: "rgba(0, 0, 255, 0.2)",
                fill: true,
                tension: 0.4,
            },
            {
                label: "Final BMI",
                data: report.map(finalbmi => finalbmi.finalBmi),
                borderColor: "green",
                backgroundColor: "rgba(0, 255, 0, 0.2)",
                fill: true,
                tension: 0.4,
            },
        ],
    };

    // Download Report as PDF
    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Teacher's BMI Progress Report", 20, 20);

        // Convert chart to image
        const chartCanvas = chartRef.current?.canvas;
        if (chartCanvas) {
            const chartImage = chartCanvas.toDataURL("image/png");
            doc.addImage(chartImage, "PNG", 20, 30, 160, 90);
        }

        // Add report table
        let yPosition = 140;
        doc.setFontSize(12);
        report.forEach(student => {
            doc.text(`${student.name} - ${student.progress} (Initial: ${student.bmi}, Final: ${student.finalBmi})`, 20, yPosition);
            yPosition += 10;
        });

        doc.save("BMI_Progress_Report.pdf");
    };

    // Download Report as CSV
    const downloadCSV = () => {
        const csvRows = [];
        csvRows.push("Student Name,Initial BMI,Final BMI,Progress");
        report.forEach(student => {
            csvRows.push(`${student.name},${student.bmi},${student.finalBmi},${student.progress}`);
        });

        const csvData = new Blob([csvRows.join("\n")], { type: "text/csv" });
        const csvUrl = URL.createObjectURL(csvData);
        const link = document.createElement("a");
        link.href = csvUrl;
        link.download = "BMI_Progress_Report.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Download Report as Excel
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(report);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "BMI Report");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        saveAs(data, "BMI_Progress_Report.xlsx");
    };

    return (
        <div className="report-container">
            <h2>Teacher's BMI Progress Report</h2>

            {report.length > 0 ? (
                <>
                    <Line ref={chartRef} data={chartData} />
                    <ul>
                        {report.map(student => (
                            <li key={student.studentId}>
                                {student.name} - {student.progress} (Initial: {student.bmi}, Final: {student.finalBmi})
                            </li>
                        ))}
                    </ul>

                    {/* Download Buttons */}
                    <button onClick={downloadPDF} style={{ marginTop: "20px", marginRight: "10px" }}>
                        Download as PDF
                    </button>
                    <button onClick={downloadCSV} style={{ marginTop: "20px", marginRight: "10px" }}>
                        Download as CSV
                    </button>
                    <button onClick={downloadExcel} style={{ marginTop: "20px" }}>
                        Download as Excel
                    </button>
                </>
            ) : (
                <p>No data available.</p>
            )}
        </div>
    );
};

export default TeacherReport;
