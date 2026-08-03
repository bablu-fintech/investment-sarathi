/*=====================================
    FEATURE SHOWCASE
======================================*/

.feature-showcase{
    padding:100px 0;
    background:#F4F8FD;
}

.showcase-grid{
    display:grid;
    grid-template-columns:320px 1fr;
    gap:45px;
    align-items:flex-start;
}

.showcase-menu{
    display:flex;
    flex-direction:column;
    gap:18px;
    position:sticky;
    top:110px;
}

.showcase-item{
    background:#fff;
    padding:22px 26px;
    border-radius:18px;
    cursor:pointer;
    font-size:18px;
    font-weight:600;
    color:#163A70;
    box-shadow:0 12px 30px rgba(0,0,0,.08);
    transition:.35s;
}

.showcase-item:hover{
    transform:translateX(8px);
}

.showcase-item.active{
    background:linear-gradient(135deg,#2563EB,#1D4ED8);
    color:#fff;
}

.showcase-preview{
    background:#fff;
    border-radius:28px;
    padding:45px;
    min-height:520px;
    box-shadow:0 20px 60px rgba(0,0,0,.08);
    position:relative;
}

.preview{
    display:none;
}

.preview.active{
    display:block;
    animation:fadeShow .4s ease;
}

@keyframes fadeShow{

    from{
        opacity:0;
        transform:translateY(20px);
    }

    to{
        opacity:1;
        transform:translateY(0);
    }

}
/*=====================================
    PREVIEW COMMON
======================================*/

.preview h2{
    font-size:42px;
    color:#163A70;
    margin-bottom:12px;
}

.preview p{
    color:#64748B;
    font-size:18px;
    line-height:1.7;
}

.preview h1{
    font-size:58px;
    color:#163A70;
    margin:20px 0;
}

/*=====================================
    GOAL PLANNER
======================================*/

.goal-card{
    margin-top:30px;
    display:flex;
    flex-direction:column;
    gap:18px;
}

.goal-row{
    background:#F5F9FF;
    padding:18px 22px;
    border-radius:14px;
    display:flex;
    justify-content:space-between;
    align-items:center;
}

.goal-row span{
    color:#64748B;
}

.goal-row strong{
    color:#163A70;
}

.progress-wrap{
    margin-top:30px;
}

.progress-top{
    display:flex;
    justify-content:space-between;
    margin-bottom:12px;
    font-weight:600;
}

.progress-bar{
    width:100%;
    height:12px;
    background:#E5E7EB;
    border-radius:20px;
    overflow:hidden;
}

.progress-fill{
    width:18%;
    height:100%;
    background:linear-gradient(90deg,#2563EB,#10B981);
    border-radius:20px;
}

/*=====================================
    SIP CALCULATOR
======================================*/

.preview-grid{
    margin-top:30px;
    display:flex;
    flex-direction:column;
    gap:16px;
}

.preview-row{
    display:flex;
    justify-content:space-between;
    align-items:center;
    background:#F8FAFC;
    padding:18px 22px;
    border-radius:14px;
}

.preview-row span{
    color:#64748B;
}

.preview-row strong{
    color:#163A70;
}

.green{
    color:#10B981 !important;
}

/*=====================================
    FINANCIAL HEALTH
======================================*/

#health h1{
    font-size:72px;
    color:#2563EB;
    margin-top:20px;
}

#health p{
    font-size:22px;
    color:#10B981;
    font-weight:600;
}
/*=====================================
    AI CHAT
======================================*/

.chat-box{
    margin-top:35px;
    display:flex;
    flex-direction:column;
    gap:18px;
}

.chat{
    padding:18px 22px;
    border-radius:14px;
    font-size:17px;
    max-width:75%;
    animation:fadeUp .5s ease;
}

.chat.ai{
    background:#EEF4FF;
    color:#163A70;
    align-self:flex-start;
}

.chat.user{
    background:#10B981;
    color:#fff;
    align-self:flex-end;
}

/*=====================================
    SHOWCASE HOVER
======================================*/

.showcase-item{
    transition:.35s;
    cursor:pointer;
}

.showcase-item:hover{
    transform:translateX(8px);
}

.preview{
    animation:fadeUp .4s ease;
}

/*=====================================
    ANIMATION
======================================*/

@keyframes fadeUp{

    from{
        opacity:0;
        transform:translateY(25px);
    }

    to{
        opacity:1;
        transform:translateY(0);
    }

}
/*=====================================
    RESPONSIVE
======================================*/

@media (max-width:992px){

    .showcase-grid{
        grid-template-columns:1fr;
        gap:40px;
    }

    .showcase-menu{
        position:static;
    }

    .showcase-preview{
        padding:30px;
        min-height:auto;
    }

    .preview h2{
        font-size:32px;
    }

    .preview h1{
        font-size:46px;
    }

}

@media (max-width:768px){

    .showcase-item{
        font-size:16px;
        padding:18px;
    }

    .goal-row,
    .preview-row{
        flex-direction:column;
        align-items:flex-start;
        gap:8px;
    }

    .chat{
        max-width:100%;
    }

    .showcase-preview{
        padding:25px;
    }

    .preview h2{
        font-size:28px;
    }

    .preview h1{
        font-size:38px;
    }

}