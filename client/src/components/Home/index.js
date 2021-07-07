import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Home.module.css";
import bunnyLineImg from "../../assets/bunny_line.jpeg";
import { Modal, Button } from "react-bootstrap";
import ViewFlowsBlock from "../ViewFlowsBlock";

export default function Home(props) {
  const [isOpen, setOpen] = useState(false);

  const navbarHeight = document.getElementById("navbarId")?.offsetHeight;
  const divStyle = {
    height: navbarHeight
      ? window.innerHeight - navbarHeight - 50 + "px"
      : "95vh",
  };

  const [featuredExamples, setFeaturedExamples] = useState();
  useEffect(() => {
    props.apiService
      .viewFeaturedFlows()
      .then((flows) => setFeaturedExamples(flows));
  }, []);

  return (
    <div>
      <div style={divStyle} className={styles.landingPage}>
        <div>
          <h2 className={styles.title}>
            Explore and share your favorite internet rabbit holes
          </h2>
          <Button
            className={styles.videoButton}
            variant="outline-dark"
            onClick={() => setOpen(true)}
          >
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
            <Modal.Body className={styles.modalBody}>
              <iframe
                width="700"
                height="394"
                src="https://www.youtube.com/embed/g_c_Jd-hP-s"
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

      <div className={styles.transition}></div>

      <div className={styles.examplesPage}>
        <div className={styles.examplesHeader}>
          <h2>Playlists for internet content</h2>
          <div className={styles.examplesHeaderDescription}>
            <div>
              The internet is a mess of infinite feeds and random links.
            </div>
            <div>
              What if we curated playlists for Internet content like
              we do for music?
            </div>
          </div>
        </div>
        {featuredExamples && (
          <div className={styles.examplesContainer}>
            <div className={styles.one}>
              <ViewFlowsBlock flow={featuredExamples[0]} />

              {/* <div className={styles.oneContent}>
              Rabbit hole:
              https://publish.twitter.com/?query=https%3A%2F%2Ftwitter.com%2Frabbitholes_%2Fstatus%2F1386366253040689155&widget=Tweet
            </div> */}
            </div>
            <div className={styles.two}>
              <ViewFlowsBlock flow={featuredExamples[1]} />
              {/* <div className={styles.twoContent}>
              developer roadmap
              https://github.com/kamranahmedse/developer-roadmap developer
              roadmap
            </div> */}
            </div>
            <div className={styles.three}>
              <ViewFlowsBlock flow={featuredExamples[2]} />
              {/* Sourdough https://www.youtube.com/watch?v=2FVfJTGpXnU */}
            </div>
            <div className={styles.four}>
              <ViewFlowsBlock flow={featuredExamples[3]} />
              {/* how the internet works */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Home.propTypes = {
  apiService: PropTypes.object,
};
