class Confirm {
  private static isOpen: boolean;
  public static getIsOpen = () => Confirm.isOpen;

  constructor() {
    Confirm.isOpen = false;
  }

  private static makeHtml = (message: [string, string, string]) => `
    <div class="confirm-content">
        <div class="confirm-text">${message[0]}</div>
        <div class="confirm-button-wrap">
            <button class="confirm-button reject">${message[1]}</button>
            <button class="confirm-button resolve">${message[2]}</button>
        </div> 
    </div>
  `;

  public static confirm = function (
    message: [string, string, string]
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (Confirm.isOpen) {
        reject(new Error("Confirm is Open"));
      }
      const html = Confirm.makeHtml(message);

      const confirmWrap: HTMLElement = document.createElement("div");
      confirmWrap.id = "confirm-wrap";
      confirmWrap.innerHTML = html;

      const buttons = confirmWrap.querySelectorAll(
        "button"
      ) as NodeListOf<HTMLButtonElement>;

      buttons[0].onclick = () => {
        confirmWrap.remove();
        Confirm.isOpen = false;
        resolve(false);
      };
      buttons[1].onclick = () => {
        confirmWrap.remove();
        Confirm.isOpen = false;
        resolve(true);
      };

      const body: HTMLElement = document.body;
      body.appendChild(confirmWrap);
    });
  };
}

export default Confirm;
