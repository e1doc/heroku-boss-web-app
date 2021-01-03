<template>
  <div class="meta-wrap">
      <div class="meta-page-title">Frequently Asked Questions</div>
      <div class="meta-content">
          <div class="meta-item" v-for="(item, index) of fees" :key="index">
                <label :for="index" class="meta-question">
                    {{ item.question }}
                </label>
                <input type="checkbox" :id="index" class="meta-toggle">
                <font-awesome-icon icon="plus" class="toggle-icon-plus" /> 
                <font-awesome-icon icon="minus" class="toggle-icon-minus" /> 
                <div class="meta-answer">
                    “ {{ item.answer }} ”
                </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Faq',
  data() {
    return {
      fees: [
        {
          question: "How do I access my Real Property SOA?",
          answer: "You first need to Enroll your existing Real Property Tax information. Once enrolled and validated, you can now generate your SOA. Just go to your Profile > Real Property Tax then click “Bill” button, and you can proceed with the payment process.",
        },
        {
          question: "I heard that the Real Property Tax Number has changed. How do I request for my new tax number?",
          answer: 'You can send a message with subject "REQUEST COPY OF NEW TAX DECLARATION". Indicate your previous TaxDec. We will respond with your new number that you will use to enroll so you can view your SOA.',
        },
        {
          question: "I've enrolled my Real Property Info but I don’t see anything. What is next?",
          answer: 'Please submit an inquiry with your existing tax declaration details. We would be validating your submitted information and reply back with your updated taxdec number. You can then proceed with enrolling the updated taxdec number and you now have access to generate your SOA. Just go to your Profile > Real Property Tax then click “Bill” button, and you can proceed with the payment process.',
        },
        {
          question: "Can I apply for new Real Property Tax here?",
          answer: "Currently, new applications for Real Property Tax is not available for online processing. You can inquire from the LGU regarding this matter.",
        },
        {
          question: "Can I apply for Solidarity Sticker here?",
          answer: "Currently, applications for Solidarity Sticker is not available for online processing. You can inquire from the LGU regarding this matter.",
        },
        {
          question: "I would like to pay for my relative's Real Property tax. Can I enroll them under my account?",
          answer: "You can enroll them under your account. Once everything checks out, you can then proceed with the payment process. The transaction needs presentation of the previous year's transaction",
        },
        {
          question: "How do I set a schedule to pay my Amelyar?",
          answer: "You first need to Enroll your existing Real Property Tax information. Once enrolled and validated, the LGU would upload your SOA here, and you can proceed with the payment process.",
        },
        {
          question: "I have multiple properties. Do I have to create individual schedules for all of them?",
          answer: "Yes, you need to individually generate SOA and book schedules for each property. This helps ensure that the transactions are timed properly, and that schedules are on-track",
        },
      ],
    };
  },
}
</script>

<style lang="scss" scoped>
.meta-wrap{
    width: 100%;
    max-width: 1100px;
    margin: 50px auto 0;
    padding-bottom: 50px;
    .meta-page-title{
        font-size: 27px;
        font-weight: bold;
        font-family: Raleway;
        text-align: center;
        width: 100%;
        padding-top: 30px;
        margin-bottom: 50px;
    }
    .meta-item{
        margin-bottom: 20px;
        position: relative;
        .meta-question{
            font-size: 18px;
            font-weight: bold;
            line-height: 1.4;
            padding: 20px 50px 20px 20px;
            background: #eaf6ff;
            display: block;
            position: relative;
            z-index: 1;
            cursor: pointer;
        }
        .meta-toggle{
            position: absolute;
            top: 25px;
            right: 30px;
            z-index: 2;
            opacity: 0;
            cursor: pointer;
        }
        .toggle-icon-plus,
        .toggle-icon-minus{
            position: absolute;
            top: 25px;
            right: 30px;
            z-index: 1;
            transition: 0.3s;
        }
        .meta-answer{
            opacity: 0;
            font-size: 16px;
            line-height: 1.6;
            position: absolute;
            background: #f5f5f5;
            padding: 30px;
            border-top: 1px solid #fff;
            z-index: -1;
            transform: translateY(-10px);
            transition: 0.3s;
        }
    }
}
.meta-toggle:checked ~ .meta-answer{
    opacity: 1;
    position: unset;
    min-height: 30px;
    transform: translateY(0px);
}

.meta-toggle:checked ~ .toggle-icon-plus{
    opacity: 0;
}

@media only screen and (max-width: 480px){
    .meta-wrap .meta-page-title {
        font-size: 22px;
    }

    .meta-wrap .meta-item .meta-question{
        font-size: 16px;
        padding: 20px 30px 20px 15px;
    }
    .meta-wrap .meta-item .meta-answer{
        font-size: 14px;
        padding: 20px;
    }

    .meta-wrap .meta-item .toggle-icon-plus, 
    .meta-wrap .meta-item .toggle-icon-minus,
    .meta-wrap .meta-item .meta-toggle {
        right: 15px;
        font-size: 12px;
    }

}
</style>