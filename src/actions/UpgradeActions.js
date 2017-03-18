import alt from '../alt';
import UserSource from 'sources/UserSource';

class UpgradeActions {
  upgradeStart(token, promoCode) {
    UserSource.upgrade(token, promoCode)
      .then( (response) => {
        this.upgradeDone(response)
      }).catch( (xhr) => {

      });
    return null;
  }

  upgradeDone(user) {
    return user;
  }
}

export default alt.createActions(UpgradeActions);
