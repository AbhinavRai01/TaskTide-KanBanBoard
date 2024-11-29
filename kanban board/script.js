let divNumber = 3;

function addNewBox(element) {
    let newBox = document.createElement("div");
    newBox.className = "category-item"; 
    newBox.dataset.origin = element.parentElement.querySelector(".category-item-box").id;

    newBox.innerHTML = `
        <span contenteditable="true">Item Name</span> 
        <input type="checkbox" class="item-done">
        <button class="delete">X</button>
    `;

    let container = element.parentElement.querySelector(".category-item-box");
    if (container) {
        container.append(newBox);
        console.log("New box added with origin:", newBox.dataset.origin);
    } else {
        console.error("No container found to append the new box.");
    }
}

function addNewCategory() {
    let newBox = document.createElement("div");
    newBox.className = "categories";

    let innerCont = `
        <div class="category-heading">
            <span contenteditable="true">CATEGORY NAME</span>
            <button class="delete-cat">X</button>
        </div>
        <div class="category-item-box" id="cat${divNumber}">
            <div class="category-item">
                <span contenteditable="true">Item Name</span> 
                <input type="checkbox" class="item-done">
                <button class="delete">X</button>
            </div>
        </div>
        <button class="add-button">+</button>
    `;
    newBox.innerHTML = innerCont;

    divNumber++;
    this.parentElement.parentElement.append(newBox);
}

function transferItem(element) {
    let parentElement = element.parentElement; // Get the parent element of the checkbox
    let doneBox = document.getElementById("done"); // Get the #done container

    if (doneBox && parentElement) {
        doneBox.append(parentElement); // Move the entire parent to #done
        console.log("Item transferred to done box.");
    } else {
        console.error("Failed to transfer item: #done container or parent element not found.");
    }
}

function transferItemBack(element){
    let parentElement = element.parentElement;
    let previousHouse = document.getElementById(element.parentElement.dataset.origin);

    if (parentElement && previousHouse) {
        previousHouse.append(parentElement);
        console.log("Item has been transferred");
    }else{
        console.error("failed");
    }
}

document.addEventListener("click", e => {
    if (e.target.matches(".add-button")) {
        addNewBox(e.target);
    }

    if (e.target.matches(".item-done")) {
        if (e.target.checked) {
            transferItem(e.target);
        }else{
            transferItemBack(e.target);
        }
    }

    if (e.target.matches(".delete-cat")) {
        e.target.closest(".categories").remove();
    }

    if (e.target.matches(".delete")) {
        e.target.parentElement.remove();
    }
});

document.getElementById('cat-add-button').addEventListener("click", addNewCategory);
