# Ledger :

## Progress So Far :

### 29 . 01 . 26 -

Nothing much. Looked at some things. I gotta lock in. We will be releasing v1.0 this weekend.
This is the truth. Let's go.

### 07 . 02. 26 -

Let's build this once and for all. No burning out. Only burning in.

I need to know what my app does right now .

So, all it does right now is that it can access a user in. That's all. No security as of now. No memory as of now.
No nothing as of now.

Questions : ( Must be solved one at a time. )

0. When are going to fix the env variable thing so that it works from vercel also? - Happening right now and on the way. Using Cloudflare.

Let's put a pin on this. Let's currently run only on local machine. We will stop the vercel thing too. Probably not, if the backend is not working.
But yeah, yeah, we will put a pin on this and we will come back to this later when we are actually scaling up. For now, let's just run locally and make sure that the main functionality of the app works. That's the whole point right now.

1. How does the application know that this particular user is in session? -

Let's put a pin on this too. Like, we don't know how the application knows that this particular user is in session too. We probably need session tokens and shit like that, but right now we don't have anything. Let's put a pin on this too.

2. How does the application fetch emails?

I guess this is probably figured out like how the application fetches email using the extras module in the ledger thing, so let's see.

3. What is the AI local model we will be using for this _particlar adventure_

So, which AI model I'll be using for this particular adventure is the main question. How does the local AI model work for this, and this is what I'll be researching for right now.

Yeah, done a little bit of research, and it doesn't look that bad at this point. 

We are not doing fine tuning the already present model. But rather, we will be solving the software engineering problems present in our application. 
They are : 

Prompt design - Making the AI understand your exact requirements

This is the most important one I guess. Context window and prompt design should be number one priority for us.

System architecture - Multi-stage processing, hybrid approaches

Multi stage processing is also good. Could and should implement. Seems to be a good idea.

Feedback loops - Learning from user corrections

This is also a very important aspect of the project. Feedback loops. 
We must alter the prompts given to the model and use the feedback loops to enhance the results.

Personalization - Adapting to individual student preferences
Performance optimization - Making it fast and efficient
UX design - How do students correct mistakes easily?


So, that is all that we must be doing tonight. Let's begin. 



### 08 . 02 . 26 -

This is what I have decided. I am not going to be building this application for an entire user base. What I'll be doing is more personalized. This is going to be only for me, till this point, I mean for me.

And yeah, so there is one rabbit hole.
1. Attendance issue. I am getting attendance issue. I mean, I cannot explain. So I have to extract data from DigiCampus, which means I need to reverse engineer the application, and then probably grab attendance from that application and put it in mine, which is a lot of work, so I'm putting it for the end.
So right now I'll be working on the UI and the email part. Let's go!