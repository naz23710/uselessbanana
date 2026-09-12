/* ==================================================
   GET HTML ELEMENTS
================================================== */


const fileInput =
    document.getElementById(
        "fileInput"
    );


const cameraInput =
    document.getElementById(
        "cameraInput"
    );


const uploadButton =
    document.getElementById(
        "uploadButton"
    );


const cameraButton =
    document.getElementById(
        "cameraButton"
    );


const dropZone =
    document.getElementById(
        "dropZone"
    );


const emptyState =
    document.getElementById(
        "emptyState"
    );


const previewState =
    document.getElementById(
        "previewState"
    );


const preview =
    document.getElementById(
        "preview"
    );


const analyzeBtn =
    document.getElementById(
        "analyzeBtn"
    );


const result =
    document.getElementById(
        "result"
    );


const removeBtn =
    document.getElementById(
        "removeBtn"
    );


const tryAgain =
    document.getElementById(
        "tryAgain"
    );



/* ==================================================
   UPLOAD PHOTO BUTTON

   Clicking the visible button opens
   the Windows file picker.
================================================== */


uploadButton.addEventListener(
    "click",
    function () {

        fileInput.click();

    }
);



/* ==================================================
   CAMERA BUTTON

   On phones this normally opens the camera.
================================================== */


cameraButton.addEventListener(
    "click",
    function () {

        cameraInput.click();

    }
);



/* ==================================================
   PROCESS IMAGE
================================================== */


function handleFile(file) {


    // No file selected

    if (!file) {

        return;

    }



    // Make sure it is an image

    if (
        !file.type.startsWith(
            "image/"
        )
    ) {

        alert(
            "Please select an image."
        );

        return;

    }



    // FileReader reads the image

    const reader =
        new FileReader();



    reader.onload =
        function (event) {


            // Put image into preview

            preview.src =
                event.target.result;



            // Hide upload screen

            emptyState.classList.add(
                "hidden"
            );



            // Show image

            previewState.classList.remove(
                "hidden"
            );



            // Show analyze button

            analyzeBtn.classList.remove(
                "hidden"
            );



            // Hide previous result

            result.classList.add(
                "hidden"
            );



        };



    reader.readAsDataURL(
        file
    );

}



/* ==================================================
   FILE PICKER RESULT
================================================== */


fileInput.addEventListener(
    "change",
    function () {

        handleFile(
            fileInput.files[0]
        );

    }
);



/* ==================================================
   CAMERA RESULT
================================================== */


cameraInput.addEventListener(
    "change",
    function () {

        handleFile(
            cameraInput.files[0]
        );

    }
);



/* ==================================================
   DRAG AND DROP
================================================== */


dropZone.addEventListener(
    "dragover",
    function (event) {

        event.preventDefault();

        dropZone.classList.add(
            "dragover"
        );

    }
);



dropZone.addEventListener(
    "dragleave",
    function () {

        dropZone.classList.remove(
            "dragover"
        );

    }
);



dropZone.addEventListener(
    "drop",
    function (event) {

        event.preventDefault();


        dropZone.classList.remove(
            "dragover"
        );


        const file =
            event.dataTransfer.files[0];


        handleFile(file);

    }
);



/* ==================================================
   ANALYZE
================================================== */


analyzeBtn.addEventListener(
    "click",
    function () {


        // Change button text

        analyzeBtn.textContent =
            "🤖 Analyzing...";


        analyzeBtn.disabled =
            true;



        // Fake analysis delay

        setTimeout(
            function () {


                /*
                ==========================================
                DEMO COMPATIBILITY ALGORITHM

                IMPORTANT:

                This is currently NOT real AI.

                We generate a random percentage so that
                the website can demonstrate the result.

                Later we can replace this with real
                computer vision.
                ==========================================
                */


                const score =
                    Math.floor(
                        Math.random() * 36
                    ) + 62;



                let title;

                let emoji;

                let reason;



                /* ================================
                   HIGH SCORE
                ================================= */


                if (
                    score >= 82
                ) {


                    title =
                        "They're probably a match!";


                    emoji =
                        "🟢";


                    reason =
                        "The pen and cap look physically compatible. " +
                        "Our extremely advanced relationship algorithm " +
                        "approves this partnership.";

                }



                /* ================================
                   MEDIUM SCORE
                ================================= */


                else if (
                    score >= 70
                ) {


                    title =
                        "It's complicated.";


                    emoji =
                        "🟡";


                    reason =
                        "There are some signs of compatibility, " +
                        "but we cannot guarantee that this cap " +
                        "has found its true pen.";

                }



                /* ================================
                   LOW SCORE
                ================================= */


                else {


                    title =
                        "Absolutely not.";


                    emoji =
                        "🔴";


                    reason =
                        "The dimensions and appearance look " +
                        "suspiciously different. Please return " +
                        "this cap to its rightful owner.";

                }



                /* ================================
                   DISPLAY RESULT
                ================================= */


                document.getElementById(
                    "score"
                ).textContent =
                    score;



                document.getElementById(
                    "resultTitle"
                ).textContent =
                    title;



                document.getElementById(
                    "resultEmoji"
                ).textContent =
                    emoji;



                document.getElementById(
                    "reason"
                ).textContent =
                    reason;



                /* ================================
                   SHOW RESULT
                ================================= */


                result.classList.remove(
                    "hidden"
                );



                /* ================================
                   SCORE BAR
                ================================= */


                setTimeout(
                    function () {

                        document.getElementById(
                            "meterFill"
                        ).style.width =
                            score + "%";

                    },
                    100
                );



                /* ================================
                   RESTORE BUTTON
                ================================= */


                analyzeBtn.textContent =
                    "🔍 Test Compatibility";


                analyzeBtn.disabled =
                    false;



                /* ================================
                   SCROLL TO RESULT
                ================================= */


                result.scrollIntoView({

                    behavior: "smooth",

                    block: "center"

                });


            },

            1200

        );

    }
);



/* ==================================================
   RESET FUNCTION
================================================== */


function reset() {


    // Clear selected files

    fileInput.value = "";

    cameraInput.value = "";



    // Remove image

    preview.src = "";



    // Show upload screen

    emptyState.classList.remove(
        "hidden"
    );



    // Hide preview

    previewState.classList.add(
        "hidden"
    );



    // Hide analyze button

    analyzeBtn.classList.add(
        "hidden"
    );



    // Hide result

    result.classList.add(
        "hidden"
    );



    // Reset progress bar

    document.getElementById(
        "meterFill"
    ).style.width =
        "0%";

}



/* ==================================================
   REMOVE PHOTO
================================================== */


removeBtn.addEventListener(
    "click",
    reset
);



/* ==================================================
   TRY AGAIN
================================================== */


tryAgain.addEventListener(
    "click",
    reset
);