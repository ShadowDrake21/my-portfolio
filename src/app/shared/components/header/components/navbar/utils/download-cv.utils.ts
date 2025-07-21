export const onDownloadCV = () => {
  const a = document.createElement('a');
  a.href = 'Krapyvianskyi D. - CV.pdf';
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
