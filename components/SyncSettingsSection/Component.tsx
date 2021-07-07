import React from 'react';
// import Peer from 'simple-peer';
// import Peerjs from 'peerjs';
import styles from './styles.css';

const Component: React.FC = () => {
  // const [initiatorPeer, setInitiatorPeer] = React.useState<Peer.Instance>();
  // const [passivePeer, setPassivePeer] = React.useState<Peer.Instance>();
  // React.useEffect(() => {
  //   const newInitiatorPeer = new Peer({ initiator: true, channelName: 'trendzz-sync' });
  //   setInitiatorPeer(newInitiatorPeer);
  //   const newPassivePeer = new Peer();
  //   setPassivePeer(newPassivePeer);
  // }, []);
  const [peerConnection, setPeerConnection] = React.useState<RTCPeerConnection>();
  const [remoteOffer, setRemoteOffer] = React.useState<RTCSessionDescriptionInit>();
  const [localSdp, setLocalSdp] = React.useState<string>();

  React.useEffect(() => {
    const fn = async () => {
      const newConn = new RTCPeerConnection({ iceServers: [] });
      newConn.onicecandidate = (evt) => {
        if (evt.candidate) {
          console.log('LOCAL SDP');
          console.log(evt.candidate.candidate);
          const sdp = evt.candidate.candidate;
          setLocalSdp(sdp);
        }
      };
      const offer = await newConn.createOffer();
      await newConn.setLocalDescription(offer);
      // await newConn.createDataChannel('first', { reliable: false });
      setPeerConnection(newConn);
    };
    fn();
  }, []);
  // let l;
  return (
    <section className={styles.sectionWrapper}>
      <h2 className={styles.settingsTitle}>
        Sync history
      </h2>
      <p className={styles.settingsDescription}>
        Testing sth. If you see this section, please ignore it.
      </p>

      <p>
        {peerConnection?.localDescription?.sdp}
        <br />
        <br />
        <br />
        {peerConnection?.localDescription?.type}
        <br />
        <br />
        <br />
        {localSdp}
      </p>
    </section>
  );
};

export default Component;
