const form = document.getElementById("regForm");
const statusEl = document.getElementById("status");
const submitBtn = document.getElementById("submitBtn");

const nameEl = document.getElementById("name");
const mobileEl = document.getElementById("mobile");
const dobEl = document.getElementById("dob");

const nameErr = document.getElementById("nameErr");
const mobileErr = document.getElementById("mobileErr");
const dobErr = document.getElementById("dobErr");

function setError(el, msg) {
    el.textContent = msg || "";
}

function validate() {
    let ok = true;

    const name = nameEl.value.trim();
    const mobile = mobileEl.value.trim();
    const dob = dobEl.value;

    setError(nameErr, "");
    setError(mobileErr, "");
    setError(dobErr, "");

    if (name.length < 2) { setError(nameErr, "Name must be at least 2 characters."); ok = false; }
    if (!/^\d{10}$/.test(mobile)) { setError(mobileErr, "Mobile must be 10 digits."); ok = false; }
    if (!dob) { setError(dobErr, "DOB is required."); ok = false; }

    return ok;
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    statusEl.textContent = "";

    if (!validate()) return;

    submitBtn.disabled = true;
    statusEl.textContent = "Submitting...";

    const payload = {
        name: nameEl.value.trim(),
        mobile: mobileEl.value.trim(),
        dob: dobEl.value,
    };

    console.log("Payload:", payload);

    try {
        const res = await fetch("/api/v1/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
            statusEl.textContent = data?.message || "Submission failed.";
            return;
        }

        statusEl.textContent = "Registered successfully ✅";
        form.reset();
    } catch (err) {
        statusEl.textContent = "Network error. Try again.";
    } finally {
        submitBtn.disabled = false;
    }
});
