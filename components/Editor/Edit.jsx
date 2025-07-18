import styles from "./Edit.module.css";
import React, { useState } from "react";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
import jsPDF from "jspdf";

function Edit() {
  const [latexCode, setLatexCode] = useState("");
  const [renderedLatex, setRenderedLatex] = useState("");

  const handleRunClick = () => {
    setRenderedLatex(latexCode);
  };

  const handleDownloadPDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add LaTeX content as text (note: jsPDF does not natively support LaTeX rendering)
    doc.text(latexCode, 10, 10);

    // Save the PDF
    doc.save("document.pdf");
  };

  return (
    <div className={styles.container}>
      <div className={styles.file}>file.txt</div>
      <div className={styles.leftPane}>
        <div className={styles.fileList}>
          <div className={styles.fileItem1}>
            <div>
              <div>file.txt</div>
            </div>
          </div>
          <div className={styles.fileItem2}>image.pdf</div>
          <div className={styles.leftEndDiv}>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <img src="/file.png" alt="" />
              <img src="/file2.png" alt="" />
              <img src="/file3.png" alt="" />
            </div>
            <div>
              <img src="/file4.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.middlePane}>
        <div className={styles.btnDiv}>
          <button>Code Editor</button>
          <p>Visual Editor</p>
        </div>
        <textarea
          className={styles.textarea}
          onChange={(e) => setLatexCode(e.target.value)}
          placeholder="Write LaTeX code here..."
        ></textarea>
      </div>
      <div className={styles.rightPane}>
        <div className={styles.play}>
          <img src="/play.png" alt="Play" onClick={handleRunClick} />
        </div>
        <BlockMath math={renderedLatex} />
        <button onClick={handleDownloadPDF}>Download PDF</button>
      </div>
    </div>
  );
}

export default Edit;
