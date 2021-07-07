/* eslint-disable import/order */
import React from 'react';
import * as sdpTransform from 'sdp-transform';
import styles from './styles.css';

const Component: React.FC = () => {
  const [peerJsConnection, setPeerJsConnection] = React.useState<any>();
  const [peerConnection, setPeerConnection] = React.useState<RTCPeerConnection>();
  const [remoteOffer, setRemoteOffer] = React.useState<RTCSessionDescriptionInit>();
  const [dataChannel, setDataChannel] = React.useState<RTCDataChannel>();
  const [iceSdp, setIceSdp] = React.useState<string>();

  React.useEffect(() => {
    const fn = async () => {
      // create PeerJS signalling client
      const PeerJs = (await import('peerjs')).default;
      const newPeerJsConnection = new PeerJs();
      setPeerJsConnection(newPeerJsConnection);

      // create RTC conn
      const newConn = new RTCPeerConnection(
        {
          iceServers: [
          // { urls: 'stun:stun.l.google.com:19302' },
          ],
        },
      );

      newConn.onicecandidate = (evt) => {
        if (evt.candidate) {
          console.log(evt.candidate.candidate);
          // for some very peculiar reason
          // if setting this candidate to state is not done
          // we lose the .local candidadte
          // even if we do evt.candidate.candidate without
          // setting it to state.
          setIceSdp(evt.candidate.candidate);
        }
      };
      const newDataChannel = await newConn.createDataChannel('trendzz');
      setDataChannel(newDataChannel);
      const offer = await newConn.createOffer();
      await newConn.setLocalDescription(offer);
      setPeerConnection(newConn);
    };
    fn();
  }, []);
  const parsedSdp = peerConnection?.localDescription?.sdp && sdpTransform.parse(
    peerConnection?.localDescription?.sdp,
  ) as any;
  parsedSdp && console.log(parsedSdp.media[0]);
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
        {}
      </p>
    </section>
  );
};

export default Component;
