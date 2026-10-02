import { ProcessPage, processMetadata } from "@/components/process/ProcessPage";

// "How I work". Translated address: /en/how-i-work, /fr/ma-methode (see
// data/page-paths.ts). The wrong-language pair is redirected in next.config.ts.
export const generateMetadata = processMetadata;
export default ProcessPage;
