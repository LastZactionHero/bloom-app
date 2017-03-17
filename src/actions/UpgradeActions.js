import alt from '../alt';
import UserSource from 'sources/UserSource';

class UpgradeActions {
  upgradeStart(token) {
    UserSource.upgrade(token)
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