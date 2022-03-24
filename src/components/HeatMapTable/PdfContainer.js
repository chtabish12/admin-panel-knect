import React from 'react';
 // eslint-disable-next-line
export default (props) => {
  const bodyRef = React.createRef();
  const createPdf = () => props.createPdf(bodyRef.current);
  return (
    <section className="pdf-container">
      <section className={props.sectionClass}>
        <button onClick={createPdf} className={props.buttonClass}>Export PDF</button>
      </section>
      <section className="pdf-body" ref={bodyRef}>
        {props.children}
      </section>
    </section>
  )
}