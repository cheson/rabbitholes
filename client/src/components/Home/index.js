import { React, useState } from "react";
import styles from "./Home.module.css";
import bunnyLineImg from "../../assets/bunny_line.jpeg";
import { Modal, Button } from "react-bootstrap";

export default function Home() {
  const [isOpen, setOpen] = useState(false);

  const navbarHeight = document.getElementById("navbarId")?.offsetHeight;
  const divStyle = {
    height: navbarHeight ? window.innerHeight - navbarHeight + "px" : "95vh",
  };

  return (
    <div>
      <div style={divStyle} className={styles.landingPage}>
        <div>
          <h2 className={styles.title}>
            Create and share your favorite internet rabbit holes
          </h2>
          <Button variant="outline-dark" onClick={() => setOpen(true)}>
            Watch video
          </Button>

          <Modal
            show={isOpen}
            onHide={() => setOpen(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/0p9o7sjjVJY"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Modal.Body>
          </Modal>
        </div>

        <img className={styles.image} src={bunnyLineImg}></img>
      </div>
      <div className={styles.examplesPage}>
        <div className={styles.examplesContainer}>
          <div className={styles.one}>One</div>
          <div className={styles.two}>Two</div>
          <div className={styles.three}>Three</div>
          <div className={styles.four}>Four</div>
        </div>
      </div>
    </div>
  );
}
