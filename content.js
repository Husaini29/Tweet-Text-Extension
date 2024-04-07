(function() {
  
    // Using Mutation Observer to observe the DOM changes
  const observer = new MutationObserver(function(mutationsList, observer) {
      for(let mutation of mutationsList) {
          if (mutation.type === 'childList') {
              const replyField = document.querySelector('.public-DraftStyleDefault-block');

              if (replyField) {
                  const button = document.createElement('button');
                  button.textContent = 'Get Tweet';
                  button.className = "tweetTextBtn";
                  button.addEventListener('click', getOriginalTweetText);

                  replyField.parentNode.insertBefore(button, replyField.nextSibling);
                  // Disconnect observer after finding reply field
                  observer.disconnect();
              }
              break;
          }
      }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  function getOriginalTweetText() {
    
      const replyField = document.querySelector('.public-DraftStyleDefault-block');
      const placeHolder = document.querySelector(".public-DraftEditorPlaceholder-inner");


      // Finding the element containing original tweet text
      const tweetContainer = document.querySelector('[data-testid="tweetText"]');
      
      if (tweetContainer) {
          const originalTweetElement = tweetContainer.querySelector('[data-testid="tweetText"] > span');
    
          if (originalTweetElement) {
              const originalTweetText = originalTweetElement.textContent.trim();
  
              alert(originalTweetText);

              placeHolder.parentElement.removeChild(placeHolder);
              
              // Manipulate reply field 
              
              const brTag = replyField.querySelector('span > br[data-text="true"]');

              if(brTag){
                const spanTag = document.createElement('span');
                spanTag.dataset.text = "true";
                spanTag.textContent = originalTweetText;

                brTag.parentNode.replaceChild(spanTag,brTag);
              }else{
                console.log("No br tag found");
              }

          } else {
              alert("Couldn't find the tweet text.");
          }
      } else {
          alert("Original tweet container not found");
      }
  }
})();
