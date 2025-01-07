'use client'

import Image from 'next/image'
import { useState, FormEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from 'lucide-react'

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const searchParams = new URLSearchParams()
    for (const [key, value] of formData.entries()) {
      searchParams.append(key, value.toString())
    }

    fetch('/__forms.html', {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: searchParams.toString()
    })
    .then(() => {
      console.log('Form successfully submitted')
      setIsSubmitted(true)
      setFormData({ name: '', email: '', message: '' }) // Reset form
    })
    .catch((error) => alert(error))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1e20] to-[#2a2e30] flex flex-col items-center justify-center p-4 text-[#d3ecf3]">
      <main className="w-full max-w-4xl mx-auto space-y-12 text-center">
        <div className="space-y-6">
          <Image
            src="/ollygarden.webp"
            alt="OllyGarden Logo"
            width={392}
            height={179}
            className="mx-auto"
          />
          <h2 className="text-3xl font-light text-[#969921] tracking-wide">Efficient Telemetry Pipelines</h2>
        </div>

        <Card className="w-full max-w-md mx-auto bg-[#2a2e30]/50 backdrop-blur-sm shadow-2xl shadow-black/40 rounded-2xl overflow-hidden border border-[#e1e533]/20">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-light text-[#fefefe]">Get in Touch</CardTitle>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <CheckCircle className="w-16 h-16 text-[#969921]/70 mx-auto" />
                <h3 className="text-xl font-semibold text-[#fefefe]">Thank You!</h3>
                <p className="text-[#d3ecf3]">Your message has been successfully sent. We&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <form data-netlify="true" onSubmit={handleSubmit} name="contact" method="POST" className="space-y-6">
                <input type="hidden" name="form-name" value="contact" />
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-left block text-[#d3ecf3]">Name</label>
                  <Input 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name" 
                    required 
                    className="bg-[#1a1e20]/50 border-[#e1e533]/50 text-[#fefefe] placeholder-[#969921]/70 focus:ring-[#e1e533] focus:border-[#e1e533] transition-all duration-300" 
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-left block text-[#d3ecf3]">Email</label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your email" 
                    required 
                    className="bg-[#1a1e20]/50 border-[#e1e533]/50 text-[#fefefe] placeholder-[#969921]/70 focus:ring-[#e1e533] focus:border-[#e1e533] transition-all duration-300" 
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-left block text-[#d3ecf3]">Message</label>
                  <Textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your message" 
                    required 
                    className="bg-[#1a1e20]/50 border-[#e1e533]/50 text-[#fefefe] placeholder-[#969921]/70 focus:ring-[#e1e533] focus:border-[#e1e533] transition-all duration-300" 
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-[#e1e533] hover:bg-[#969921] text-[#1a1e20] transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Send Message
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </main>
      <footer className="mt-12 text-center text-sm text-[#e1e533]/60">
        © 2025 OllyGarden, Inc. All rights reserved.
      </footer>
    </div>
  )
}