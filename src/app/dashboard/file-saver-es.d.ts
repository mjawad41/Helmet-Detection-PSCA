declare module 'file-saver-es' {
    const saveAs: (data: Blob, filename?: string, options?: {}) => void;
    export { saveAs };
  }
  