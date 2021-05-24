import { React, useState } from "react";
import styles from "./Home.module.css";
import bunnyLineImg from "../../assets/bunny_line.jpeg";
import { Modal, Button } from "react-bootstrap";
import ViewFlowsBlock from "../ViewFlowsBlock";

console.log(ViewFlowsBlock);

export default function Home() {
  const flow = {
    _id: "60904fef5afbc13f22d41536",
    userId: "beK6rpPtrzUPQv7pqaGq8oYAJTx2",
    flowTitle: "Exploring the Internet",
    flowDescription:
      "In the 1800s, inventions that harnessed electricity fundamentally changed the world and our ways of life. Today we wake up to alarms set on our electric phones, pull bread out of our electric refrigerators and stick them in electric toasters, all perhaps while watching the news on an electric TV before driving to work in an electric car. \r\n\r\nSimilarly, around the turn of the 21st century, the modern Internet grew from humble beginnings to become as commonplace as electricity, something that just works and just exists. We can FaceTime our family and friends, browse Instagram, stream shows from Netflix, trade stocks on Robinhood, download books from our local library, and so much more!\r\n\r\nI find the Internet and all its implications extremely fascinating. Feel free to post below with any comments or questions!\r\n",
    blocks: [
      { _id: "60904fef5afbc13f22d41537", extraFlow: [] },
      {
        _id: "60904fef5afbc13f22d41538",
        url: "https://www.youtube.com/watch?v=Dxcc6ycZ73M",
        description:
          "An introduction by Vint Cerf, an early pioneer of the Internet.",
        extraFlow: [],
      },
      {
        _id: "60904fef5afbc13f22d41539",
        url: "https://www.youtube.com/watch?v=ZhEf7e4kopM",
        description:
          "The USPS uses trucks, trains, planes and postal workers to deliver mail and packages. How does the Internet physically deliver data? You’ll learn the difference between “Internet” and “WiFi”!",
        extraFlow: [],
      },
      {
        _id: "60904fef5afbc13f22d4153a",
        url: "https://www.submarinecablemap.com/",
        description:
          "As mentioned in the previous video, most of the internet is actually connected with physical cables buried underground and even underwater! Check out this incredibly detailed map of all submarine internet cables!",
        extraFlow: [],
      },
    ],
    numViews: 167,
    createdAt: "2021-05-03T19:33:03.713Z",
    updatedAt: "2021-05-24T06:24:33.156Z",
    __v: 0,
    user: {
      firebase_id: "beK6rpPtrzUPQv7pqaGq8oYAJTx2",
      email: "haha@haha.com",
      name: "haha haha",
    },
    id: "60904fef5afbc13f22d41536",
  };
  console.log(flow);
  const [isOpen, setOpen] = useState(false);

  // todo: potentially adjust this to show the examples instead of trying to go full screen
  const navbarHeight = document.getElementById("navbarId")?.offsetHeight;
  const divStyle = {
    height: navbarHeight
      ? window.innerHeight - navbarHeight - 50 + "px"
      : "95vh",
  };

  return (
    <div>
      <div style={divStyle} className={styles.landingPage}>
        <div>
          <h2 className={styles.title}>
            Explore and share your favorite internet rabbit holes
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
          {/* Note: this can maybe be a better replacement of the home page description */}
          <div className={styles.examplesHeaderDescription}>
            <div>The internet is unstructured and overwhelming 😟</div>
            <div>
              Instead, we can curate our favorite URLs into thoughtfully ordered
              playlists 😊
            </div>
            {/* Roadmap / essay where the building blocks are links / playlist */}
          </div>
        </div>
        {/* Note: eventually these examples can be dynamically featured, not hardcoded */}
        {/* omg thought: these could be ordered in same ui style as the actual lists? */}
        <div className={styles.examplesContainer}>
          <div className={styles.one}>
            <ViewFlowsBlock flow={flow} />

            {/* <div className={styles.oneContent}>
              Rabbit hole:
              https://publish.twitter.com/?query=https%3A%2F%2Ftwitter.com%2Frabbitholes_%2Fstatus%2F1386366253040689155&widget=Tweet
            </div> */}
          </div>
          <div className={styles.two}>
            <ViewFlowsBlock flow={flow} />
            {/* <div className={styles.twoContent}>
              developer roadmap
              https://github.com/kamranahmedse/developer-roadmap developer
              roadmap
            </div> */}
          </div>
          <div className={styles.three}>
            <ViewFlowsBlock flow={flow} />
            {/* Sourdough https://www.youtube.com/watch?v=2FVfJTGpXnU */}
          </div>
          <div className={styles.four}>
            <ViewFlowsBlock flow={flow} />
            {/* how the internet works */}
          </div>
        </div>
      </div>
    </div>
  );
}
