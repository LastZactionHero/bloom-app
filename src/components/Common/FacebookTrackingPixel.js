import React from 'react';

class FacebookTrackingPixel extends React.Component {
  constructor(props) {
    super(props);
    this.pixelTracked = false;
  }

  componentDidMount = () => {
    if(!this.pixelTracked) {
      this.pixelTracked = true;

      if(typeof window.fbq === 'undefined') {
        const pixelID = '1563867503641874';

        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','https://connect.facebook.net/en_US/fbevents.js');
        window.fbq = fbq;
        window.fbq('init', pixelID);
      }
      window.fbq('track', 'PageView');
      window.fbq('track', this.props.eventName);
    }
  }

  render() {
    return(
      <div><img height="1" width="1" src="https://www.facebook.com/tr?id=1563867503641874&ev=PageView&noscript=1" /></div>
    );
  }
}

export default FacebookTrackingPixel;