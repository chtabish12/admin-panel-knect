import { savePDF } from "@progress/kendo-react-pdf";

class DocService {
  createPdf = (html) => {
    savePDF(html, {
      fileName: "service-reports.pdf",
    });
  };
}

const Doc = new DocService();
export default Doc;
