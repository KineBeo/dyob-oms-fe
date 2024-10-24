import Markdown from "markdown-to-jsx";

interface MoreDestailsProps {
  markdown: string,
  image: string
}

const MoreDetails = (props: MoreDestailsProps) => {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="bg-[#f9f3ea] drop-shadow-md p-4">
        <h2 className="font-bold text-[#3F291B] text-2xl">
          Chi tiết sản phẩm
        </h2>
      </div>
      <section className="flex md:flex-row flex-col items-center gap-8 px-6">
        <div className="mt-4 md:w-3/5">
          <Markdown options={{
            overrides: {
              h1: {
                component: 'h1',
                props: {
                  className: 'text-2xl font-bold text-[#3F291B]'
                }
              },
              h2: {
                component: 'h2',
                props: {
                  className: 'text-xl font-semibold text-[#7A0505]'
                }
              },
              p: {
                component: 'p',
                props: {
                  className: 'text-gray-700'
                }
              },
              h3: {
                component: 'h3',
                props: {
                  className: 'text-xl font-semibold text-[#7A0505] mt-4'
                }
              },
              h4: {
                component: 'h4',
                props: {
                  className: 'text-lg font-semibold text-[#7A0505] mt-4'
                }
              },
            }
          }}>{props.markdown}</Markdown>
        </div>

        <div className="md:w-2/5">
          <img
            src={props.image}
            alt="An vị khang Ông bụt"
            className="shadow-lg rounded-lg w-full object-cover"
          />
        </div>
      </section>
    </div>
  );

};

export default MoreDetails;
