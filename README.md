# beehive-blaster
Webpage wrapper around a fermat spiral plotter.  
Samples the fermat spiral for each 'grain' to be plotted, returning a list of polar coordinates.  

# goals  
beehive-blaster set out to:  
Slap together a function sampling the fermat spiral.  
Plot the fermat spiral.  
Produce an extreme test case of image rotation aliasing artifacts with the canvas API.  
Do all of these tasks in 1 day, or approximately 4 hours of high-focus effort.  
# timeline
beehive-blaster took approximately 1 day on 12/20/2020.  
code and interface reuse made scripting this sketch BLAZING FAST.  
# results
beehive-blaster delivered a function sampling the fermat spiral after several minutes of false starts.  
beehive-blaster plots the fermat spiral, with minimal visual oddities at extremely small viewport sizes.  
beehive-blaster rotates each plotted image to expose rotation-aliasing, then spins two smaller spirals to make the effect clear in motion.  
beehive-blaster was appropriately scoped and written on-time!  
# instructions for use
like all of the early-SQCU autopedagogies circa 2020, running beehive-blaster is easy!  
  
1:Pull the repository.  
2:Load the repo's html file (in this case, index.html) in your favorite web browser.  
3:Enjoy!  