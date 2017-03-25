import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../actions/actionCreators';

class Chatbox extends React.Component {
    constructor(props) {
        super(props);
        this.getInputValue = this.getInputValue.bind(this);
        this.pasteHtmlAtCaret = this.pasteHtmlAtCaret.bind(this);
    }

    componentDidMount() {
        this.emojisData = this.props.emojisData;
        this.refs.inputElem.focus();
    }

    getInputValue(e) {
        const newMessage = this.refs.inputElem.innerHTML;
        let imgTag;
        if (e.which === 32 || (e.which === 13 && e.shiftKey)) {
            for (let i = 0; i < this.emojisData.length; i++) {
                if (newMessage.includes(this.emojisData[i].emojiStr)) {
                    imgTag = `<img class="emoji" src=${this.emojisData[i].emojiImg} />`;
                    this.pasteHtmlAtCaret(imgTag, this.emojisData[i].emojiStr);
                }
            }
        }
        if (e.which === 13 && !e.shiftKey) {
            e.preventDefault();
            this.refs.inputElem.innerHTML = '';
            this.refs.inputElem.focus();
            this.props.addMessage(newMessage);
        }
    }

    pasteHtmlAtCaret(html, str) {
        let sel;
        let range;
        let el;
        let frag;
        let node;
        let lastNode;
        let startPos;
        if (window.getSelection) {
            // IE9 and non-IE
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                startPos = sel.focusNode.data.indexOf(str);
                range = sel.getRangeAt(0);
                range.setStart(sel.focusNode, startPos);
                range.deleteContents();

                // Range.createContextualFragment() would be useful here but is
                // non-standard and not supported in all browsers (IE9, for one)
                el = document.createElement('div');
                el.innerHTML = html;

                // It is safer to add elemnt to fragment as it doesn't destroy
                // actual DOM structure
                frag = document.createDocumentFragment();
                node = el.firstChild;
                lastNode = frag.appendChild(node);
                range.insertNode(frag);

                // Preserve the selection
                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        } else if (document.selection && document.selection.type !== 'Control') {
            // IE < 9
            document.selection.createRange().pasteHTML(html);
        }
    }

    render() {
        return (
            <div className="chatbox">
                <div className="message-box">
                    {
                        this.props.messages.map(function(message, index) {
                            return (
                                <div className="message-wrapper" key={index}>
                                    <span className="message" dangerouslySetInnerHTML={{__html: message}}></span>
                                </div>
                            );
                        })
                    }
                </div>
                <div ref="inputElem" className="textarea" contentEditable="true"
                    onKeyPress={this.getInputValue} placeholder="Type your message with rich emojis 😃"></div>
            </div>
        );
    }
}

Chatbox.propTypes = {
    emojisData: PropTypes.array,
    messages: PropTypes.array
};

const mapStateToProps = (state) => ({
    emojisData: state.data.emojisData,
    messages: state.data.messages
});

const mapDispatchToProps = (dispatch) => ({
    addMessage: (message) => {
        dispatch(sendMessage(message));
    }
});

export default Chatbox = connect(
    mapStateToProps,
    mapDispatchToProps
)(Chatbox);
