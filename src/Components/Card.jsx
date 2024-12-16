import React from "react";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";


export default function App() {

    const {isOpen, onOpen, onClose} = useDisclosure();
    const [backdrop, setBackdrop] = React.useState('opaque')
  
    const backdrops = ["blur"];
  
    const handleOpen = (backdrop) => {
      setBackdrop(backdrop)
      onOpen();
    }


  const list = [
    {
      title: "Orange",
      img: "https://images.pexels.com/photos/26921067/pexels-photo-26921067/free-photo-of-mer-paysage-plage-vacances.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      price: "$5.50",
      button:"Add To Cart",
    },
    {
      title: "Tangerine",
      img: "https://images.pexels.com/photos/27011250/pexels-photo-27011250/free-photo-of-neige-bois-hiver-brouiller.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      price: "$3.00",
      button:"Add To Cart",

    },
    {
      title: "Raspberry",
      img: "https://images.pexels.com/photos/5306143/pexels-photo-5306143.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      price: "$10.00",
      button:"Add To Cart",
    },
    {
      title: "Lemon",
      img: "https://images.pexels.com/photos/16094516/pexels-photo-16094516/free-photo-of-mer-aube-plage-rochers.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      price: "$5.30",
      button:"Add To Cart",
    },
    {
      title: "Avocado",
      img: "https://images.pexels.com/photos/11558845/pexels-photo-11558845.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      price: "$15.70",
      button:"Add To Cart",
    },
    {
      title: "Lemon 2",
      img: "https://images.pexels.com/photos/26919537/pexels-photo-26919537/free-photo-of-bois-oiseau-animal-mignon.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      price: "$8.00",
      button:"Add To Cart",
    },
    {
      title: "Banana",
      img: "https://images.pexels.com/photos/26840789/pexels-photo-26840789/free-photo-of-ville-rue-building-batiment.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      price: "$7.50",
      button:"Add To Cart",
    },
    {
      title: "Watermelon",
      img: "https://images.pexels.com/photos/26919537/pexels-photo-26919537/free-photo-of-bois-oiseau-animal-mignon.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      price: "$12.20",
      button:"Add To Cart",
    },
  ];

  return (
    <>
    <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 mt-4">
      {list.map((item, index) => (
        <Card shadow="lg" key={index} isPressable onPress={() => console.log("item pressed")}>
  <CardBody className="overflow-visible p-0 relative">
    <Image
      shadow="sm"
      radius="lg"
      width="100%"
      alt={item.title}
      className="w-full object-cover h-[140px] relative"
      src={item.img}
    />
    <div className="absolute inset-0 flex items-center justify-center ">
 
        <h1 className="text-white z-50">Rushi</h1>
      
    </div>
  </CardBody>
  <CardFooter className="text-small justify-around">
    <Button color="" variant="shadow">
      ❌
    </Button>
    <Button color="" variant="shadow">
      ❌
    </Button>
  </CardFooter>
</Card>

      ))}
    </div>

    <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p> 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                  dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. 
                  Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. 
                  Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur 
                  proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      </>
  );
}
