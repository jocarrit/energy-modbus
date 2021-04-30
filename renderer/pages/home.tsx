import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Fragment } from 'react'
import { Disclosure } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { LightningBoltIcon } from '@heroicons/react/solid'
import Linechart from '../components/LineChart'
import { ipcRenderer } from "electron";

const navigation = ['Dashboard']


function Home() {
  const [ current, setCurrent ] = useState(0)
  useEffect(() => {
    ipcRenderer.on("current", (event, arg) => {
      console.log(arg)
      setCurrent(arg)
    })
  })

  return (
    <div>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <LightningBoltIcon className="h-10 w-10"/>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item, itemIdx) =>
                        itemIdx === 0 ? (
                          <Fragment key={item}>
                            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                            <a href="#" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                              {item}
                            </a>
                          </Fragment>
                        ) : (
                          <a
                            key={item}
                            href="#"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                          >
                            {item}
                          </a>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item, itemIdx) =>
                  itemIdx === 0 ? (
                    <Fragment key={item}>
                      {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                      <a href="#" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">
                        {item}
                      </a>
                    </Fragment>
                  ) : (
                    <a
                      key={item}
                      href="#"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      {item}
                    </a>
                  )
                )}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-700">
                
               
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl h-full mx-auto py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="flex flex-col items-center">
            <div className="flex container m-4 bg-white shadow-lg sm:rounded-3xl sm:p-8">
                    <div className="sm:rounded-lg sm:p-8 mr-4 bg-indigo-800">
                      <LightningBoltIcon className="h-4 w-4 m-0 text-white"/>
                    </div>
                    <div>
                      <p className="font-bold">Corriente</p>
                      <h1 className="text-5xl text-indigo-800">{ current }<span className="text-3xl text-gray-400">ma</span></h1>
                    </div>
            </div>
            <div className="container max-h-full m-4 bg-white shadow-lg sm:rounded-3xl sm:p-10">
                    <Linechart />
            </div>
          </div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  );
}

export default Home;
