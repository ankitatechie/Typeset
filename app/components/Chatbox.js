import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../actions/actionCreators';

class Chatbox extends React.Component {
    constructor(props) {
        super(props);
        this.getInputValue = this.getInputValue.bind(this);
        this.pasteHtmlAtCaret = this.pasteHtmlAtCaret.bind(this);
    }

    getInputValue(e) {
        if (e.which === 32) {
            const emojisData = this.props.emojisData;
            let newMessage = this.refs.inputElem.innerHTML;
            let imgTag;
            for (let i = 0; i < emojisData.length; i++) {
                if (newMessage.includes(emojisData[i].emojiStr)) {
                    imgTag = `<img class="emoji" src=${emojisData[i].emojiImg} />`;
                    this.pasteHtmlAtCaret(imgTag, newMessage, emojisData[i].emojiStr);
                    // this.refs.inputElem.innerText = newMessage.replace(emojisData[i].emojiStr, '');
                }
            }
        }
    }

    pasteHtmlAtCaret(html, newMessage, str) {
        let sel, range, el, frag, node, lastNode, chileNode;
        if (window.getSelection) {
            // IE9 and non-IE
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();

                // Range.createContextualFragment() would be useful here but is
                // non-standard and not supported in all browsers (IE9, for one)
                el = document.createElement("div");
                el.innerHTML = html;
                frag = document.createDocumentFragment();
                while ((node = el.firstChild)) {
                    lastNode = frag.appendChild(node);
                }
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
        } else if (document.selection && document.selection.type != "Control") {
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
                                    <span className="message">{message}</span>
                                </div>
                            );
                        })
                    }
                </div>
                <div ref="inputElem" className="textarea" contentEditable="true"
                    onKeyPress={this.getInputValue} autoFocus>
                    Hey ssup 
                </div>
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
