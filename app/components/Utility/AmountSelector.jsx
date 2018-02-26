import React from "react";
import PropTypes from "prop-types";
import Translate from "react-translate-component";
import ChainTypes from "../Utility/ChainTypes";
import BindToChainState from "../Utility/BindToChainState";
import FormattedAsset from "./FormattedAsset";
import FloatingDropdown from "./FloatingDropdown";
import Immutable from "immutable";
import counterpart from "counterpart";

class AssetSelector extends React.Component {

    static propTypes = {
        assets: ChainTypes.ChainAssetsList,
        value: PropTypes.string, // asset id
        onChange: PropTypes.func,
        scroll_length: PropTypes.number
    };

    render() {
        if(this.props.assets.length === 0) return null;

        return <FloatingDropdown
            entries={this.props.assets.map(a => a && a.get("symbol")).filter(a => !!a)}
            values={this.props.assets.reduce((map, a) => {if (a && a.get("symbol")) map[a.get("symbol")] = a; return map;}, {})}
            singleEntry={this.props.assets[0] ? <FormattedAsset asset={this.props.assets[0].get("id")} amount={0} hide_amount={true}/> : null}
            value={this.props.value}
            onChange={this.props.onChange}
            scroll_length={this.props.scroll_length}
        />;
    }
}

AssetSelector = BindToChainState(AssetSelector);

class AmountSelector extends React.Component {

    static propTypes = {
        label: PropTypes.string, // a translation key for the label
        asset: ChainTypes.ChainAsset.isRequired, // selected asset by default
        assets: PropTypes.array,
        amount: PropTypes.any,
        placeholder: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        tabIndex: PropTypes.number,
        error: PropTypes.string,
        scroll_length: PropTypes.number
    };

    static defaultProps = {
        disabled: false
    };

    componentDidMount() {
        this.onAssetChange(this.props.asset);
    }

    formatAmount(v) {
        /*// TODO: use asset's precision to format the number*/
        if (!v) v = "";
        if (typeof v === "number") v = v.toString();
        let value = v.trim().replace(/,/g, "");

        return value;
    }

    _onChange(event) {
        let amount = event.target.value;
        this.props.onChange({amount: amount, asset: this.props.asset});
    }

    onAssetChange(selected_asset) {
        this.props.onChange({amount: this.props.amount, asset: selected_asset});
    }

    render() {
        //console.log("Calling AmountSelector: " + this.props.label + this.props.asset + this.props.assets + this.props.amount + this.props.placeholder + this.props.error);
        let value = this.props.error ? counterpart.translate(this.props.error) : this.formatAmount(this.props.amount);
        return (
            <div className="amount-selector" style={this.props.style}>
                <label className="right-label">{this.props.display_balance}</label>
                <Translate className="left-label" component="label" content={this.props.label}/>
                <div className="inline-label input-wrapper">
                    <input
                        disabled={this.props.disabled}
                        type="text"
                        value={value || ""}
                        placeholder={this.props.placeholder}
                        onChange={this._onChange.bind(this) }
                        tabIndex={this.props.tabIndex}
                    />
                    <div className="form-label select floating-dropdown">
                        <AssetSelector
                            ref={this.props.refCallback}
                            value={this.props.asset.get("symbol")}
                            assets={Immutable.List(this.props.assets)}
                            onChange={this.onAssetChange.bind(this)}
                            scroll_length={this.props.scroll_length}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
AmountSelector = BindToChainState(AmountSelector);

export default AmountSelector;
