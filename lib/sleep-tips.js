'use babel';

import SleepTipsView from './sleep-tips-view';
import { CompositeDisposable } from 'atom';

export default {

  sleepTipsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.sleepTipsView = new SleepTipsView(state.sleepTipsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.sleepTipsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'sleep-tips:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.sleepTipsView.destroy();
  },

  serialize() {
    return {
      sleepTipsViewState: this.sleepTipsView.serialize()
    };
  },

  toggle() {
    console.log('SleepTips was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
