var isBrowser = (typeof window !== 'undefined');
var Packery = isBrowser ? window.Packery || require('packery') : null;
var imagesloaded = isBrowser ? require('imagesloaded') : null;
var refName = 'packeryContainer';

function PackeryComponent(React) {
    return React.createClass({
        packery: false,

        displayName: 'PackeryComponent',

        propTypes: {
            disableImagesLoaded: React.PropTypes.bool,
            options: React.PropTypes.object
        },

        getDefaultProps: function() {
            return {
                disableImagesLoaded: false,
                options: {},
                className: '',
                elementType: 'div'
            };
        },

        initializePackery: function(force) {
            if (this.packery) {
                this.packery.destroy()
            }

            if (!this.packery || force) {
                this.packery = new Packery(
                    this.refs[refName],
                    this.props.options
                );
            }
        },

        imagesLoaded: function() {
            if (this.props.disableImagesLoaded) return;

            imagesloaded(
                this.refs[refName],
                function(instance) {
                    this.packery.layout();
                }.bind(this)
            );
        },

        componentDidMount: function() {
            this.initializePackery();
            this.imagesLoaded();
        },

        componentDidUpdate: function() {
            this.initializePackery(true);
            this.imagesLoaded();
            this.packery.reloadItems();
        },

        render: function() {
            return React.createElement(this.props.elementType, {
                className: this.props.className,
                ref: refName
            }, this.props.children);
        }
    })
}

module.exports = PackeryComponent;
