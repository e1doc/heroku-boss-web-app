<template>
    <div class="coming-soon-container">
        <div class="meta-wrap">
            <img class="meta-img" src="../assets/bacoor-cavite-logo.png">
            <h1>Something <strong>really good</strong> is coming <strong>very soon</strong>.</h1>
            <div class="meta-subtext">
                We're currently implementing some good features, please visit again after a few hours.<br>
                Thank you!
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ComingSoon'
}
</script>

<style lang="scss" scoped>
.coming-soon-container {
    background: transparent;
    position: relative;
    z-index: 1;
    min-height: 100vh;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    img{
        margin-bottom: 30px;
    }
    h1 {
        width: 100%;
        margin-bottom: 30px;
        font-size: 38px;
        font-weight: 400;
    }

    .meta-subtext {
        width: 100%;
        font-size: 20px;
        line-height: 1.8;
        
    }
}
.coming-soon-container:after {
    content: "";
    background-image: url('../assets/3911318.jpg');
    background-color: #fff;
    background-size: cover;
    background-position: center;
    opacity: 0.05;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: 0;
}
</style>