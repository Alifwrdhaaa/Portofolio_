import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  User, Mail, MessageSquare, Send, Upload
} from 'lucide-react';

const Contact = () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Form States
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [commentForm, setCommentForm] = useState({ name: '', content: '' });

  // Dummy fetch untuk protoype (akan diganti Supabase asli jika .env sudah diisi)
  useEffect(() => {
    const fetchComments = async () => {
      // Coba fetch dari supabase
      try {
        const { data, error } = await supabase.from('comments').select('*').order('created_at', { ascending: false });
        if (data && !error) {
          setComments(data);
        } else {
          // Kosong jika tidak ada data / gagal konek
          setComments([]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchComments();
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    
    setIsLoading(true);
    try {
      // 1. Simpan ke Supabase sebagai arsip (opsional, tidak apa-apa jika gagal)
      await supabase.from('messages').insert([contactForm]);
      
      // 2. Kirim notifikasi ke Email via Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          name: contactForm.name,
          email: contactForm.email,
          message: contactForm.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert("Pesan berhasil terkirim ke Email Anda!");
        setContactForm({ name: '', email: '', message: '' });
      } else {
        alert("Gagal mengirim pesan ke email.");
      }
    } catch (error) {
      console.log("Error sending message", error);
      alert("Terjadi kesalahan sistem saat mengirim pesan.");
    }
    setIsLoading(false);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentForm.name || !commentForm.content) return;

    setIsLoading(true);
    try {
      const newComment = { ...commentForm, created_at: new Date() };
      const { data, error } = await supabase.from('comments').insert([newComment]).select();
      if (!error && data) {
        setComments([data[0], ...comments]);
        setCommentForm({ name: '', content: '' });
      } else {
        // Fallback untuk UI
        setComments([{...newComment, id: Date.now()}, ...comments]);
        setCommentForm({ name: '', content: '' });
      }
    } catch (error) {
      console.log("Supabase not connected yet.");
    }
    setIsLoading(false);
  };

  return (
    <section id="contact" className="w-full min-h-screen pt-24 pb-32 text-gray-300 relative z-10 border-t border-gray-800/50">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-3 leading-[1.1]">
          Contact Me
        </h2>
        <p className="text-gray-500 text-lg font-mono">
          Have something in mind? Send a message and let's connect.
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* KOLOM KIRI: HUBUNGI SAYA */}
        <div className="lg:col-span-5 flex flex-col space-y-8">
          
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-2">Get in Touch</h3>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
              Feel free to reach out if you want to collaborate, discuss ideas, or simply say hello.
            </p>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  className="w-full bg-transparent border border-gray-800 rounded-2xl py-4 pl-12 pr-4 text-white text-base focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  className="w-full bg-transparent border border-gray-800 rounded-2xl py-4 pl-12 pr-4 text-white text-base focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
                <textarea 
                  placeholder="Your Message" 
                  rows="4"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  className="w-full bg-transparent border border-gray-800 rounded-2xl py-4 pl-12 pr-4 text-white text-base focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-white/10 hover:bg-white/20 text-white text-base font-medium py-4 rounded-2xl flex items-center justify-center space-x-2 transition-colors disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-2xl">
            <h4 className="text-gray-500 text-sm font-medium mb-6">Connect With Me</h4>
            <div className="grid grid-cols-2 gap-4">
              <a href="#" className="flex items-center p-4 border border-gray-800 rounded-2xl hover:border-gray-600 transition-colors group">
                <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-500 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                <div>
                  <p className="text-sm font-bold text-white">LinkedIn</p>
                  <p className="text-xs text-gray-600">@linkedin</p>
                </div>
              </a>
              <a href="#" className="flex items-center p-4 border border-gray-800 rounded-2xl hover:border-gray-600 transition-colors group">
                <svg className="w-6 h-6 text-gray-400 group-hover:text-pink-500 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                <div>
                  <p className="text-sm font-bold text-white">Instagram</p>
                  <p className="text-xs text-gray-600">@instagram</p>
                </div>
              </a>
              <a href="#" className="flex items-center p-4 border border-gray-800 rounded-2xl hover:border-gray-600 transition-colors group">
                <svg className="w-6 h-6 text-gray-400 group-hover:text-white mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                <div>
                  <p className="text-sm font-bold text-white">Github</p>
                  <p className="text-xs text-gray-600">@github</p>
                </div>
              </a>
              <a href="#" className="flex items-center p-4 border border-gray-800 rounded-2xl hover:border-gray-600 transition-colors group">
                <svg className="w-6 h-6 text-gray-400 group-hover:text-red-500 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.13 1 12 1 12s0 3.87.42 5.58a2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.87 23 12 23 12s0-3.87-.42-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon></svg>
                <div>
                  <p className="text-sm font-bold text-white">YouTube</p>
                  <p className="text-xs text-gray-600">@youtube</p>
                </div>
              </a>
              <a href="#" className="flex items-center p-4 border border-gray-800 rounded-2xl hover:border-gray-600 transition-colors group">
                <svg className="w-6 h-6 text-gray-400 group-hover:text-white mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="18" r="4"></circle><path d="M12 18V2l7 4"></path></svg>
                <div>
                  <p className="text-sm font-bold text-white">TikTok</p>
                  <p className="text-xs text-gray-600">@tiktok</p>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* KOLOM KANAN: COMMENTS */}
        <div className="lg:col-span-7 bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-2xl flex flex-col h-full">
          <h3 className="text-3xl font-bold text-white mb-2">Comments</h3>
          <p className="text-gray-500 text-sm mb-8">Leave your thoughts here</p>

          <form onSubmit={handleCommentSubmit} className="space-y-4 mb-8">
            <input 
              type="text" 
              placeholder="Your Name" 
              value={commentForm.name}
              onChange={(e) => setCommentForm({...commentForm, name: e.target.value})}
              className="w-full bg-transparent border border-gray-800 rounded-2xl py-4 px-6 text-white text-base focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <textarea 
              placeholder="Your Comment" 
              rows="3"
              value={commentForm.content}
              onChange={(e) => setCommentForm({...commentForm, content: e.target.value})}
              className="w-full bg-transparent border border-gray-800 rounded-2xl py-4 px-6 text-white text-base focus:outline-none focus:border-indigo-500 transition-colors resize-none"
            ></textarea>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex-1 cursor-pointer bg-transparent border border-gray-800 rounded-2xl py-4 flex items-center justify-center space-x-2 hover:border-gray-600 transition-colors">
                <Upload className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400 font-medium">Upload Image</span>
                <input type="file" className="hidden" accept="image/*" />
              </label>
              
              <button 
                type="submit" 
                disabled={isLoading}
                className="flex-[2] bg-[#2a2a2a] hover:bg-[#333] text-white text-base font-medium py-4 rounded-2xl transition-colors disabled:opacity-50"
              >
                Post Comment
              </button>
            </div>
          </form>

          {/* Comment Feed */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {comments.map((comment, index) => (
              <div key={index} className="bg-[#161616] border border-purple-500/20 rounded-2xl p-5 relative overflow-hidden">
                <div className="flex items-start space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 font-bold uppercase shrink-0">
                    {comment.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h5 className="font-bold text-white text-sm">{comment.name}</h5>
                      {comment.pinned && (
                        <span className="px-2 py-0.5 bg-purple-900/50 text-purple-300 text-[10px] font-bold rounded-full border border-purple-700/50">
                          📌 PINNED
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mb-2">@{comment.name.replace(/\s+/g, '').toLowerCase()}</p>
                    
                    {comment.image_url ? (
                      <div className="rounded-xl overflow-hidden mb-2 max-w-sm border border-gray-800">
                        <img src={comment.image_url} alt="Comment Attachment" className="w-full h-auto object-cover" />
                      </div>
                    ) : (
                      <p className="text-gray-300 text-sm leading-relaxed mb-2">{comment.content}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
