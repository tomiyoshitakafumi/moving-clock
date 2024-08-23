customElements.define("inline-circle", class InlineCircle extends HTMLElement {

    connectedCallback() {
        this.style.display = "inline-block";
        this.style.borderRadius = "50%";
        this.style.border = "solid black 1px";
        this.style.transform = "translateY(10%)";
        if (!this.style.width) {this.style.width = "0.8em";
            this.style.height = "0.8em";
        }
    }
    static get observedAttributes() { return ["diameter", "color","bordercolor"]; }
    attributeChangedCallback(name, oldValue, newValue) {
        switch(name) {
            case "diameter":
                this.style.width = newValue;
                this.style.height = newValue;
                break;
            case "color":
                this.style.backgroundColor = newValue;
                break;
            // 新たにbordercoloerを追加(なぜかborderが上書きできなかった) ここに this.style.backgroundColor を設定したら動いたので分岐には入っていそう
                // 答え　connectedCallback()で上書きされている
            case "bordercolor":
                this.style.border = `solid ${newValue} 1px`;
                break;
        }
    }
    get diameter() { return this.getAttribute("diameter"); }
    set diameter(diameter) { this.setAttribute("diameter", diameter); }
    get color() { return this.getAttribute("color"); }
    set color(color) { this.setAttribute("color", color); }
    
    // 新たにbordercoloerを追加(直接set内でthis.style.borderColor = color;としてもいい気がする)
    get bordercolor() { return this.getAttribute("bordercolor"); }
    set bordercolor(bordercolor) { this.setAttribute("bordercolor", bordercolor); }
});