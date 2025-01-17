disintegrate.init();


document.getElementById("card1").addEventListener("click", e=>{
    const disObj = disintegrate.getDisObj(e.target)
    disintegrate.createSimultaneousParticles(disObj)
    
    skeleton = document.getElementById("skeleton")
    const disSkeleton = disintegrate.getDisObj(skeleton)
    disintegrate.createSimultaneousParticles(disSkeleton)
    
    texts = document.getElementById("texts")
    const disTexts = disintegrate.getDisObj(texts)
    disintegrate.createSimultaneousParticles(disTexts)
    
    skeleton.remove()
    e.target.remove()
    texts.remove()
});
